"use client";

import type { ComponentType } from "react";

// ── Lucide ──────────────────────────────────────────────────
import {
  ChevronRight,
  ChevronDown,
  X,
  Copy,
  Menu,
  Dot,
  Monitor,
  Sun,
  Moon,
  RectangleHorizontal,
  Circle,
  SquareLibrary,
  Clock,
  Star,
  Settings,
  Plus,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Search,
  Loader,
  Users,
  Lock,
  Mail,
  Bell,
  Shield,
  Palette,
  Lightbulb,
  Rocket,
  Heart,
  Paintbrush,
  Brain,
  Globe,
  User,
  ImageIcon,
  Link,
  Check,
  RotateCcw,
  Play,
  Pause,
  Pipette,
  Home,
  MessageCircle,
  Inbox,
  Pencil,
  SkipForward,
} from "lucide-react";

// ── Tabler ──────────────────────────────────────────────────
import {
  IconChevronRight,
  IconChevronDown,
  IconColorPicker,
  IconX,
  IconCopy,
  IconMenu2,
  IconPoint,
  IconDeviceDesktop,
  IconSun,
  IconMoon,
  IconSquare,
  IconCircle,
  IconLibrary,
  IconClock,
  IconStar,
  IconSettings,
  IconPlus,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconSearch,
  IconLoader2,
  IconUsers,
  IconLock,
  IconMail,
  IconBell,
  IconShield,
  IconPalette,
  IconBulb,
  IconRocket,
  IconHeart,
  IconBrush,
  IconBrain,
  IconGlobe,
  IconUser,
  IconPhoto,
  IconLink,
  IconCheck,
  IconRotate2,
  IconPlayerPlay,
  IconPlayerPause,
  IconHome,
  IconMessageCircle,
  IconInbox,
  IconPencil,
  IconPlayerSkipForward,
} from "@tabler/icons-react";

// ── Phosphor ────────────────────────────────────────────────
import {
  CaretRight as PhCaretRight,
  CaretDown as PhCaretDown,
  Eyedropper as PhEyedropper,
  X as PhX,
  Copy as PhCopy,
  List as PhList,
  DotOutline as PhDotOutline,
  Monitor as PhMonitor,
  Sun as PhSun,
  Moon as PhMoon,
  Rectangle as PhRectangle,
  Circle as PhCircle,
  Books as PhBooks,
  Clock as PhClock,
  Star as PhStar,
  Gear as PhGear,
  Plus as PhPlus,
  ArrowLeft as PhArrowLeft,
  ArrowRight as PhArrowRight,
  ArrowUp as PhArrowUp,
  MagnifyingGlass as PhMagnifyingGlass,
  Spinner as PhSpinner,
  Users as PhUsers,
  Lock as PhLock,
  Envelope as PhEnvelope,
  Bell as PhBell,
  Shield as PhShield,
  Palette as PhPalette,
  Lightbulb as PhLightbulb,
  Rocket as PhRocket,
  Heart as PhHeart,
  PaintBrush as PhPaintBrush,
  Brain as PhBrain,
  Globe as PhGlobe,
  User as PhUser,
  Image as PhImage,
  Link as PhLink,
  Check as PhCheck,
  ArrowCounterClockwise as PhRotateCcw,
  Play as PhPlay,
  Pause as PhPause,
  House as PhHouse,
  ChatCircle as PhChatCircle,
  Tray as PhTray,
  Pencil as PhPencil,
  SkipForward as PhSkipForward,
} from "@phosphor-icons/react";

// ── HugeIcons (removed — consolidated to lucide-react) ──────

// ── Types ───────────────────────────────────────────────────

export interface IconComponentProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export type IconComponent = ComponentType<IconComponentProps>;

export type IconLibrary = "lucide" | "tabler" | "phosphor" | "hugeicons";

export type IconName =
  | "chevron-right" | "chevron-down" | "x" | "copy" | "menu" | "dot"
  | "monitor" | "sun" | "moon" | "rectangle-horizontal" | "circle"
  | "square-library" | "clock" | "star" | "settings"
  | "plus" | "arrow-left" | "arrow-right" | "arrow-up" | "search" | "loader"
  | "users" | "lock" | "mail" | "bell" | "shield" | "palette"
  | "lightbulb" | "rocket" | "heart" | "paintbrush" | "brain"
  | "globe" | "user"
  | "image" | "link" | "check" | "rotate-ccw"
  | "play" | "pause" | "pipette"
  | "home" | "message-circle" | "inbox"
  | "pencil" | "skip-forward";

export const iconLibraryOrder: IconLibrary[] = ["lucide", "tabler", "phosphor", "hugeicons"];

export const iconLibraryLabels: Record<IconLibrary, string> = {
  lucide: "Lucide",
  tabler: "Tabler",
  phosphor: "Phosphor",
  hugeicons: "HugeIcons",
};

// ── Adapter Factories ───────────────────────────────────────

// Tabler: `strokeWidth` → `stroke` prop
function tabler(Icon: ComponentType<{ size?: number; stroke?: number; className?: string }>): IconComponent {
  return function TablerAdapter({ size, strokeWidth, className }: IconComponentProps) {
    return <Icon size={size} stroke={strokeWidth} className={className} />;
  };
}

// Phosphor: uses filled paths per weight variant, not CSS stroke.
// Map numeric strokeWidth → discrete weight prop.
type PhosphorWeight = "thin" | "light" | "regular" | "bold";
function phosphor(Icon: ComponentType<{ size?: number; weight?: PhosphorWeight; className?: string }>): IconComponent {
  return function PhosphorAdapter({ size, strokeWidth, className }: IconComponentProps) {
    const weight: PhosphorWeight = strokeWidth != null && strokeWidth >= 1.75 ? "regular" : "light";
    return <Icon size={size} weight={weight} className={className} />;
  };
}

// HugeIcons adapter removed — consolidated to lucide-react

// ── Icon Maps ───────────────────────────────────────────────

const lucideMap: Record<IconName, IconComponent> = {
  "chevron-right": ChevronRight,
  "chevron-down": ChevronDown,
  "pipette": Pipette,
  "x": X,
  "copy": Copy,
  "menu": Menu,
  "dot": Dot,
  "monitor": Monitor,
  "sun": Sun,
  "moon": Moon,
  "rectangle-horizontal": RectangleHorizontal,
  "circle": Circle,
  "square-library": SquareLibrary,
  "clock": Clock,
  "star": Star,
  "settings": Settings,
  "plus": Plus,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-up": ArrowUp,
  "search": Search,
  "loader": Loader,
  "users": Users,
  "lock": Lock,
  "mail": Mail,
  "bell": Bell,
  "shield": Shield,
  "palette": Palette,
  "lightbulb": Lightbulb,
  "rocket": Rocket,
  "heart": Heart,
  "paintbrush": Paintbrush,
  "brain": Brain,
  "globe": Globe,
  "user": User,
  "image": ImageIcon,
  "link": Link,
  "check": Check,
  "rotate-ccw": RotateCcw,
  "play": Play,
  "pause": Pause,
  "home": Home,
  "message-circle": MessageCircle,
  "inbox": Inbox,
  "pencil": Pencil,
  "skip-forward": SkipForward,
};

const tablerMap: Record<IconName, IconComponent> = {
  "chevron-right": tabler(IconChevronRight),
  "chevron-down": tabler(IconChevronDown),
  "pipette": tabler(IconColorPicker),
  "x": tabler(IconX),
  "copy": tabler(IconCopy),
  "menu": tabler(IconMenu2),
  "dot": tabler(IconPoint),
  "monitor": tabler(IconDeviceDesktop),
  "sun": tabler(IconSun),
  "moon": tabler(IconMoon),
  "rectangle-horizontal": tabler(IconSquare),
  "circle": tabler(IconCircle),
  "square-library": tabler(IconLibrary),
  "clock": tabler(IconClock),
  "star": tabler(IconStar),
  "settings": tabler(IconSettings),
  "plus": tabler(IconPlus),
  "arrow-left": tabler(IconArrowLeft),
  "arrow-right": tabler(IconArrowRight),
  "arrow-up": tabler(IconArrowUp),
  "search": tabler(IconSearch),
  "loader": tabler(IconLoader2),
  "users": tabler(IconUsers),
  "lock": tabler(IconLock),
  "mail": tabler(IconMail),
  "bell": tabler(IconBell),
  "shield": tabler(IconShield),
  "palette": tabler(IconPalette),
  "lightbulb": tabler(IconBulb),
  "rocket": tabler(IconRocket),
  "heart": tabler(IconHeart),
  "paintbrush": tabler(IconBrush),
  "brain": tabler(IconBrain),
  "globe": tabler(IconGlobe),
  "user": tabler(IconUser),
  "image": tabler(IconPhoto),
  "link": tabler(IconLink),
  "check": tabler(IconCheck),
  "rotate-ccw": tabler(IconRotate2),
  "play": tabler(IconPlayerPlay),
  "pause": tabler(IconPlayerPause),
  "home": tabler(IconHome),
  "message-circle": tabler(IconMessageCircle),
  "inbox": tabler(IconInbox),
  "pencil": tabler(IconPencil),
  "skip-forward": tabler(IconPlayerSkipForward),
};

const phosphorMap: Record<IconName, IconComponent> = {
  "chevron-right": phosphor(PhCaretRight),
  "chevron-down": phosphor(PhCaretDown),
  "pipette": phosphor(PhEyedropper),
  "x": phosphor(PhX),
  "copy": phosphor(PhCopy),
  "menu": phosphor(PhList),
  "dot": phosphor(PhDotOutline),
  "monitor": phosphor(PhMonitor),
  "sun": phosphor(PhSun),
  "moon": phosphor(PhMoon),
  "rectangle-horizontal": phosphor(PhRectangle),
  "circle": phosphor(PhCircle),
  "square-library": phosphor(PhBooks),
  "clock": phosphor(PhClock),
  "star": phosphor(PhStar),
  "settings": phosphor(PhGear),
  "plus": phosphor(PhPlus),
  "arrow-left": phosphor(PhArrowLeft),
  "arrow-right": phosphor(PhArrowRight),
  "arrow-up": phosphor(PhArrowUp),
  "search": phosphor(PhMagnifyingGlass),
  "loader": phosphor(PhSpinner),
  "users": phosphor(PhUsers),
  "lock": phosphor(PhLock),
  "mail": phosphor(PhEnvelope),
  "bell": phosphor(PhBell),
  "shield": phosphor(PhShield),
  "palette": phosphor(PhPalette),
  "lightbulb": phosphor(PhLightbulb),
  "rocket": phosphor(PhRocket),
  "heart": phosphor(PhHeart),
  "paintbrush": phosphor(PhPaintBrush),
  "brain": phosphor(PhBrain),
  "globe": phosphor(PhGlobe),
  "user": phosphor(PhUser),
  "image": phosphor(PhImage),
  "link": phosphor(PhLink),
  "check": phosphor(PhCheck),
  "rotate-ccw": phosphor(PhRotateCcw),
  "play": phosphor(PhPlay),
  "pause": phosphor(PhPause),
  "home": phosphor(PhHouse),
  "message-circle": phosphor(PhChatCircle),
  "inbox": phosphor(PhTray),
  "pencil": phosphor(PhPencil),
  "skip-forward": phosphor(PhSkipForward),
};

// hugeicons consolidated to lucide
const hugeiconsMap: Record<IconName, IconComponent> = lucideMap;

// ── Unified Map ─────────────────────────────────────────────

export const iconMap: Record<IconLibrary, Record<IconName, IconComponent>> = {
  lucide: lucideMap,
  tabler: tablerMap,
  phosphor: phosphorMap,
  hugeicons: hugeiconsMap,
};
