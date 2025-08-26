import { 
  DocumentTextIcon, 
  PlayIcon, 
  DocumentIcon, 
  PresentationChartLineIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

export const IconProyecto = ({ className = "w-6 h-6" }: { className?: string }) => 
  <DocumentTextIcon className={className} />;

export const IconEjecucion = ({ className = "w-6 h-6" }: { className?: string }) => 
  <PlayIcon className={className} />;

export const IconInforme = ({ className = "w-6 h-6" }: { className?: string }) => 
  <DocumentIcon className={className} />;

export const IconSustentacion = ({ className = "w-6 h-6" }: { className?: string }) => 
  <PresentationChartLineIcon className={className} />;

export const IconCierre = ({ className = "w-6 h-6" }: { className?: string }) => 
  <XMarkIcon className={className} />;
