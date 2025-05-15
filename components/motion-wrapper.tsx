'use client';

import { 
  motion as motionImport,
  AnimatePresence as AP,
  useAnimate as useAnimateHook,
  useAnimation as useAnimationHook,
  useInView as useInViewHook,
  useScroll as useScrollHook,
  useSpring as useSpringHook,
  useTransform as useTransformHook,
  useMotionValue as useMotionValueHook,
  useMotionTemplate as useMotionTemplateHook,
  useVelocity as useVelocityHook,
  useCycle as useCycleHook,
  animate as animateFunc,
} from 'framer-motion';

// Re-export AnimatePresence
export const AnimatePresence = AP;

// Re-export motion directly
export const motion = motionImport;

// Re-export animation hooks
export const useAnimate = useAnimateHook;
export const useAnimation = useAnimationHook;
export const useInView = useInViewHook;
export const useScroll = useScrollHook;
export const useSpring = useSpringHook;
export const useTransform = useTransformHook;
export const useMotionValue = useMotionValueHook;
export const useMotionTemplate = useMotionTemplateHook;
export const useVelocity = useVelocityHook;
export const useCycle = useCycleHook;

// Re-export functions
export const animate = animateFunc; 