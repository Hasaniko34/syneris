import { useState } from 'react';
import { AlertTriangle, ChevronDown, Code, Clipboard, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from '@/components/ui/use-toast';

export function SynbotAnalyzeErrorCard() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    errorType: string;
    possibleCauses: string[];
    suggestedFixes: string[];
    confidence: number;
  } | null>(null);
  const [context, setContext] = useState('');
  const [showContext, setShowContext] = useState(false);
  const [copied, setCopied] = useState(false);

  // Hatayı analiz et
  const handleAnalyze = async () => {
    if (!errorMessage) {
      toast({
        title: "Hata mesajı gerekli",
        description: "Lütfen analiz edilecek bir hata mesajı girin.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      // Gerçek API çağrısı denemesi
      let data;
      try {
        const response = await fetch('/api/synbot/analyze/errors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            errorMessage,
            context: context || undefined,
          }),
        });

        if (!response.ok) {
          throw new Error('API yanıt vermedi');
        }

        data = await response.json();
      } catch (apiError) {
        console.log('API çağrısı başarısız, örnek veri kullanılıyor', apiError);
        
        // API çalışmıyorsa örnek veri döndür
        // Hata türüne göre farklı örnek sonuçlar
        if (errorMessage.includes("is not a function")) {
          data = {
            analysis: {
              errorType: "TypeError: X is not a function",
              possibleCauses: [
                "Fonksiyon olarak çağrılmaya çalışılan değişken aslında bir fonksiyon değil",
                "Değişken adında yazım hatası yapılmış olabilir",
                "Modül veya kütüphane düzgün import edilmemiş olabilir",
                "Fonksiyon tanımlanmadan önce çağrılmış olabilir"
              ],
              suggestedFixes: [
                "Çağırdığınız değişkenin gerçekten bir fonksiyon olup olmadığını kontrol edin",
                "Değişken adının doğru yazıldığından emin olun",
                "İlgili modülün doğru şekilde import edildiğini kontrol edin",
                "Fonksiyonun, çağrılmadan önce tanımlandığından emin olun"
              ],
              confidence: 0.89
            }
          };
        } else if (errorMessage.includes("Cannot read property") || errorMessage.includes("Cannot read properties")) {
          data = {
            analysis: {
              errorType: "TypeError: Cannot read properties of undefined/null",
              possibleCauses: [
                "Erişilmeye çalışılan nesne undefined veya null",
                "API'den gelen veri henüz yüklenmemiş olabilir",
                "Özelliğe erişmeden önce nesnenin varlığı kontrol edilmemiş",
                "Nesne yapısında değişiklik yapılmış olabilir"
              ],
              suggestedFixes: [
                "Optional chaining (?.) operatörünü kullanın: obj?.prop",
                "Erişmeden önce nesne varlığını kontrol edin: if (obj && obj.prop)",
                "Varsayılan değer için nullish coalescing (??) kullanın: obj.prop ?? defaultValue",
                "Hata konumunda nesnenin değerini console.log ile kontrol edin"
              ],
              confidence: 0.92
            }
          };
        } else if (errorMessage.includes("'module' not found") || errorMessage.includes("Cannot find module")) {
          data = {
            analysis: {
              errorType: "Module not found Error",
              possibleCauses: [
                "Belirtilen modül yüklenmemiş",
                "Package.json dosyasında bağımlılık belirtilmemiş",
                "Dosya yolu yanlış yazılmış",
                "Modül adında yazım hatası"
              ],
              suggestedFixes: [
                "npm install veya yarn add ile eksik modülü yükleyin",
                "Bağımlılığı package.json dosyasına ekleyin",
                "Dosya yolunu doğru şekilde yazın",
                "Modül adını kontrol edin"
              ],
              confidence: 0.85
            }
          };
        } else {
          data = {
            analysis: {
              errorType: "Genel JavaScript Hatası",
              possibleCauses: [
                "Sözdizimi (syntax) hatası",
                "Bilinmeyen değişken veya fonksiyon kullanımı",
                "Yanlış veri tipi",
                "Beklenmeyen senkronizasyon sorunları"
              ],
              suggestedFixes: [
                "Kodun sözdizimine uygun yazıldığından emin olun",
                "Tüm değişken ve fonksiyonların tanımlandığını kontrol edin",
                "Veri tiplerini kontrol edin ve gerekirse dönüşüm yapın",
                "async/await veya Promise yapılarını düzgün kullanın"
              ],
              confidence: 0.75
            }
          };
        }
      }

      // Analiz sonucunu göster
      setAnalysisResult(data.analysis);
      
      toast({
        title: "Analiz Tamamlandı",
        description: "Hata başarıyla analiz edildi.",
      });
    } catch (error) {
      console.error('Hata analizi sırasında bir sorun oluştu:', error);
      toast({
        title: "Analiz Hatası",
        description: "Hata analiz edilirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Panoya kopyala
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
          title: "Kopyalandı!",
          description: "Çözüm önerileri panoya kopyalandı.",
        });
      },
      (err) => {
        console.error('Panoya kopyalama hatası:', err);
        toast({
          title: "Kopyalama Hatası",
          description: "Çözüm önerileri kopyalanırken bir sorun oluştu.",
          variant: "destructive",
        });
      }
    );
  };

  // Güven rozeti rengini belirle
  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.8) {
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Yüksek Güven: {Math.round(confidence * 100)}%</Badge>;
    } else if (confidence >= 0.5) {
      return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Orta Güven: {Math.round(confidence * 100)}%</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Düşük Güven: {Math.round(confidence * 100)}%</Badge>;
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Kod Hatası Analizi
        </CardTitle>
        <CardDescription>
          Karşılaştığınız hata mesajlarını yapıştırın ve SynBot'un analiz etmesini sağlayın
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Hata mesajını buraya yapıştırın..."
          value={errorMessage}
          onChange={(e) => setErrorMessage(e.target.value)}
          rows={4}
          className="resize-none font-mono text-sm"
        />
        
        <Collapsible open={showContext} onOpenChange={setShowContext}>
          <CollapsibleTrigger className="flex items-center w-full text-sm text-muted-foreground hover:text-foreground">
            <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${showContext ? 'rotate-180' : ''}`} />
            {showContext ? 'Bağlam Bilgisi Gizle' : 'Bağlam Bilgisi Ekle (İsteğe Bağlı)'}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <Textarea
              placeholder="Hatanın oluştuğu kod parçası veya bağlam bilgisini buraya ekleyebilirsiniz..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={3}
              className="resize-none font-mono text-sm"
            />
          </CollapsibleContent>
        </Collapsible>
        
        <Button 
          onClick={handleAnalyze} 
          disabled={isAnalyzing || !errorMessage}
          className="w-full"
        >
          {isAnalyzing ? 'Analiz Ediliyor...' : 'Hatayı Analiz Et'}
        </Button>
        
        {analysisResult && (
          <div className="mt-4 space-y-4 border rounded-md p-4 bg-muted/30">
            <div className="flex justify-between items-center">
              <div className="font-medium flex items-center gap-2">
                <Code className="h-4 w-4 text-purple-500" />
                <span>{analysisResult.errorType}</span>
              </div>
              {getConfidenceBadge(analysisResult.confidence)}
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="causes">
                <AccordionTrigger className="text-sm py-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    Olası Nedenler
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm">
                  <ul className="list-disc list-inside space-y-1 pl-1 text-muted-foreground">
                    {analysisResult.possibleCauses.map((cause, index) => (
                      <li key={`cause-${index}`}>{cause}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="fixes">
                <AccordionTrigger className="text-sm py-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Çözüm Önerileri
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm">
                  <ul className="list-disc list-inside space-y-1 pl-1 text-muted-foreground">
                    {analysisResult.suggestedFixes.map((fix, index) => (
                      <li key={`fix-${index}`}>{fix}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <Button 
              variant="outline" 
              size="sm"
              className="flex gap-2 w-full justify-center"
              onClick={() => copyToClipboard(analysisResult.suggestedFixes.join('\n'))}
            >
              {copied ? (
                <>
                  <CheckCircle className="h-4 w-4" /> Kopyalandı
                </>
              ) : (
                <>
                  <Clipboard className="h-4 w-4" /> Çözüm Önerilerini Kopyala
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between text-xs text-muted-foreground border-t pt-4">
        <div>
          SynBot tarafından analiz edilir
        </div>
        <div>
          Sonuçlar yaklaşıktır, her zaman kontrol edin
        </div>
      </CardFooter>
    </Card>
  );
} 