import {
  FormSelect,
  FormButton,
  FormButtonExport,
} from "../../components/FormElems/FormElems";
import {
  ChartType,
  ChartVariation,
  type FiltersBarProps,
} from "./../../types/index.type";

const optionsDateFormat = [
  { value: "Day", id: "day" },
  { value: "Week", id: "week" },
];

const optionsChartType = [
  { value: ChartType.Line, id: "line" },
  { value: ChartType.Area, id: "area" },
];

const FiltersBar = ({
  activeLine,
  activeDateFormat,
  activeChartType,
  setActiveLine,
  setActiveDateFormat,
  setActiveChartType,
  theme,
  onChangeTheme,
  isLoading,
  handleExportFunction,
  variations,
}: FiltersBarProps) => {
  const optionsLines = variations.map((item) => ({
    value: item.name,
    id: item.id,
  }));

  optionsLines.unshift({ value: ChartVariation.All, id: 10000 });

  return (
    <div className="filtersBar">
      <div className="sectionOne">
        <FormSelect
          name="line"
          value={activeLine}
          options={optionsLines}
          onChangeValue={setActiveLine}
        />
        <FormSelect
          name="dateFormat"
          value={activeDateFormat}
          options={optionsDateFormat}
          onChangeValue={setActiveDateFormat}
        />
      </div>
      <div className="sectionTwo">
        <FormSelect
          value={activeChartType}
          options={optionsChartType}
          name="chartType"
          onChangeValue={setActiveChartType}
        />
        <FormButton value={theme} onChangeTheme={onChangeTheme} />
        <FormButtonExport
          handleExport={handleExportFunction}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default FiltersBar;
