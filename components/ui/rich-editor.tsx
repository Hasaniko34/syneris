"use client";

import React, { useEffect, useState } from "react";
import { Bold, Italic, Link, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Heading1, Heading2, Heading3, Image as ImageIcon, Code, FileVideo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichEditor({ value, onChange, placeholder = "İçerik girin...", className = "" }: RichEditorProps) {
  const [editorState, setEditorState] = useState<string>(value || "");
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [editorMode, setEditorMode] = useState<"wysiwyg" | "html">("wysiwyg");

  const editorRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = editorState;
    }
  }, [editorState]);

  useEffect(() => {
    const handleInput = () => {
      if (editorRef.current) {
        const newContent = editorRef.current.innerHTML;
        setEditorState(newContent);
        onChange(newContent);
      }
    };

    const editorElement = editorRef.current;
    if (editorElement) {
      editorElement.addEventListener("input", handleInput);
    }

    return () => {
      if (editorElement) {
        editorElement.removeEventListener("input", handleInput);
      }
    };
  }, [onChange]);

  const execCommand = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setEditorState(newContent);
      onChange(newContent);
      editorRef.current.focus();
    }
  };

  const handleBold = () => execCommand("bold");
  const handleItalic = () => execCommand("italic");
  const handleUnorderedList = () => execCommand("insertUnorderedList");
  const handleOrderedList = () => execCommand("insertOrderedList");
  const handleAlignLeft = () => execCommand("justifyLeft");
  const handleAlignCenter = () => execCommand("justifyCenter");
  const handleAlignRight = () => execCommand("justifyRight");
  const handleH1 = () => execCommand("formatBlock", "<h1>");
  const handleH2 = () => execCommand("formatBlock", "<h2>");
  const handleH3 = () => execCommand("formatBlock", "<h3>");
  const handleCode = () => execCommand("formatBlock", "<pre>");

  const handleInsertLink = () => {
    if (linkUrl) {
      const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText || linkUrl}</a>`;
      execCommand("insertHTML", linkHtml);
      setLinkUrl("");
      setLinkText("");
      setIsLinkDialogOpen(false);
    }
  };

  const handleInsertImage = () => {
    if (imageUrl) {
      const imgHtml = `<img src="${imageUrl}" alt="${imageAlt}" style="max-width: 100%" />`;
      execCommand("insertHTML", imgHtml);
      setImageUrl("");
      setImageAlt("");
      setIsImageDialogOpen(false);
    }
  };

  const handleInsertVideo = () => {
    if (videoUrl) {
      // YouTube URL'ini embed URL'ine dönüştür
      let embedUrl = videoUrl;
      if (videoUrl.includes("youtube.com/watch?v=")) {
        const videoId = videoUrl.split("v=")[1].split("&")[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (videoUrl.includes("youtu.be/")) {
        const videoId = videoUrl.split("youtu.be/")[1];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }

      const videoHtml = `
        <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
          <iframe 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
            src="${embedUrl}" 
            title="${videoTitle || 'Video'}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      `;
      execCommand("insertHTML", videoHtml);
      setVideoUrl("");
      setVideoTitle("");
      setIsVideoDialogOpen(false);
    }
  };

  const toggleEditorMode = () => {
    if (editorMode === "wysiwyg") {
      setEditorMode("html");
    } else {
      setEditorMode("wysiwyg");
      if (editorRef.current) {
        editorRef.current.innerHTML = editorState;
      }
    }
  };

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorState(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={`border rounded-md ${className}`}>
      <div className="bg-muted/40 p-2 flex flex-wrap items-center gap-1 border-b">
        <Button type="button" variant="ghost" size="icon" onClick={handleBold} title="Kalın">
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={handleItalic} title="İtalik">
          <Italic className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6 mx-1" />
        <Button type="button" variant="ghost" size="icon" onClick={handleUnorderedList} title="Madde İşaretleri">
          <List className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={handleOrderedList} title="Numaralı Liste">
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6 mx-1" />
        <Button type="button" variant="ghost" size="icon" onClick={handleAlignLeft} title="Sola Hizala">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={handleAlignCenter} title="Ortala">
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={handleAlignRight} title="Sağa Hizala">
          <AlignRight className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6 mx-1" />
        <Button type="button" variant="ghost" size="icon" onClick={handleH1} title="Başlık 1">
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={handleH2} title="Başlık 2">
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={handleH3} title="Başlık 3">
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={handleCode} title="Kod Bloğu">
          <Code className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6 mx-1" />
        <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="ghost" size="icon" title="Bağlantı Ekle">
              <Link className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Bağlantı Ekle</DialogTitle>
              <DialogDescription>
                Eklemek istediğiniz bağlantının URL'sini ve metnini girin.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link-url" className="text-right">
                  URL
                </Label>
                <Input
                  id="link-url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://ornek.com"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link-text" className="text-right">
                  Metin
                </Label>
                <Input
                  id="link-text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Bağlantı metni"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsLinkDialogOpen(false)}>
                İptal
              </Button>
              <Button type="button" onClick={handleInsertLink}>
                Ekle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="ghost" size="icon" title="Görsel Ekle">
              <ImageIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Görsel Ekle</DialogTitle>
              <DialogDescription>
                Eklemek istediğiniz görselin URL'sini ve açıklamasını girin.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image-url" className="text-right">
                  URL
                </Label>
                <Input
                  id="image-url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://ornek.com/resim.jpg"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image-alt" className="text-right">
                  Açıklama
                </Label>
                <Input
                  id="image-alt"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Görsel açıklaması"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsImageDialogOpen(false)}>
                İptal
              </Button>
              <Button type="button" onClick={handleInsertImage}>
                Ekle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="ghost" size="icon" title="Video Ekle">
              <FileVideo className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Video Ekle</DialogTitle>
              <DialogDescription>
                YouTube video bağlantısını ve başlığını girin.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="video-url" className="text-right">
                  YouTube URL
                </Label>
                <Input
                  id="video-url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="video-title" className="text-right">
                  Başlık
                </Label>
                <Input
                  id="video-title"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="Video başlığı"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsVideoDialogOpen(false)}>
                İptal
              </Button>
              <Button type="button" onClick={handleInsertVideo}>
                Ekle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="ml-auto">
          <Button type="button" variant="ghost" size="sm" onClick={toggleEditorMode}>
            {editorMode === "wysiwyg" ? "HTML" : "Görsel Editör"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="bg-transparent ml-2 mt-2">
          <TabsTrigger value="edit" className="text-xs">Düzenle</TabsTrigger>
          <TabsTrigger value="preview" className="text-xs">Önizleme</TabsTrigger>
        </TabsList>
        <TabsContent value="edit" className="p-0 m-0">
          {editorMode === "wysiwyg" ? (
            <div
              ref={editorRef}
              className="min-h-32 p-4 focus:outline-none"
              contentEditable={true}
              dangerouslySetInnerHTML={{ __html: editorState }}
              placeholder={placeholder}
            />
          ) : (
            <textarea
              className="w-full min-h-32 p-4 font-mono text-sm bg-muted/50"
              value={editorState}
              onChange={handleHtmlChange}
              placeholder="HTML içeriği buraya girin..."
            />
          )}
        </TabsContent>
        <TabsContent value="preview" className="p-4 prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: editorState }} />
          {editorState.trim() === "" && (
            <p className="text-muted-foreground">Önizlemek için içerik ekleyin.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 