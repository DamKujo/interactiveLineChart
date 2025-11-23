import type { Ref } from "react";
import type { Themes } from "./../layout/ThemeLayout";
import type { CartesianChartProps } from "recharts/types/util/types";

export interface IDataDTO {
  data: IDateStats[];
  variations: IVariations[];
}

export interface IDateStats {
  date: string;
  visits: Record<string, number>;
  conversions: Record<string, number>;
}

export interface IVariations {
  id: number;
  name: ChartVariation;
}

export enum DateFormat {
  Day = "Day",
  Week = "Week",
}

export enum ChartType {
  Line = "Line",
  Area = "Area",
}

export enum ChartVariation {
  VariationA = "Variation A",
  VariationB = "Variation B",
  VariationC = "Variation C",
  Original = "Original",
  All = "All variations selected",
}

export interface IOption {
  value: string;
  id: number | string;
}

export interface ChartProps extends CartesianChartProps {
  variations: IVariations[];
  activeLine: string;
  colors: Record<ChartVariation, string>;
  customTooltip?: React.ReactNode;
  isAnimationActive?: boolean;
  ref?: Ref<SVGSVGElement>;
}

export interface FiltersBarProps {
  activeLine: string;
  setActiveLine: React.Dispatch<React.SetStateAction<string>>;
  activeDateFormat: DateFormat;
  setActiveDateFormat: React.Dispatch<React.SetStateAction<DateFormat>>;
  activeChartType: ChartType;
  setActiveChartType: React.Dispatch<React.SetStateAction<ChartType>>;
  theme: Themes;
  onChangeTheme: Function;
  isLoading: boolean;
  handleExportFunction: Function;
  variations: IVariations[];
}

export interface FormSelectProps {
  name?: string;
  value: string;
  onChangeValue: Function;
  options?: IOption[];
}

export interface FormButtonProps {
  onChangeTheme: Function;
  value: string;
}

export interface FormButtonExport {
  handleExport: Function;
  isLoading: boolean;
}
