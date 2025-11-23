import FiltersBar from "../FiltersBar/FiltersBar";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ChartType,
  type IDataDTO,
  ChartVariation,
  DateFormat,
} from "../../types/index.type";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import useWeeksBetween from "../../hooks/useWeeksBetween";
import useDaysBetween from "../../hooks/useDaysBetween";
import { useTheme } from "../../layout/ThemeLayout";
import ChartLine from "./ChartLine";
import ChartArea from "./ChartArea";
import { useCurrentPng } from "recharts-to-png";
import FileSaver from "file-saver";
import dayjs from "dayjs";
const ChartContainer = () => {
  const [activeLine, setActiveLine] = useState<string>(
    ChartVariation.VariationA
  );
  const [activeDateFormat, setActiveDateFormat] = useState<DateFormat>(
    DateFormat.Day
  );
  const [activeChartType, setActiveChartType] = useState<ChartType>(
    ChartType.Line
  );
  const [dataDTO, setDataDTO] = useState<IDataDTO | null>(null);
  const [getPng, { ref, isLoading }] = useCurrentPng();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch("data.json");
        const json = await res.json();
        if (mounted) setDataDTO(json);
      } catch (err) {
        console.error("Failed to load data.json", err);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  const handleDownload = useCallback(async () => {
    const png = await getPng();

    if (png) {
      FileSaver.saveAs(png, `${dayjs().format("YYYY-MM-DD")}.png`);
    }
  }, [getPng]);

  const variations = dataDTO?.variations ?? [];

  const dataDays = useDaysBetween(dataDTO?.data ?? [], variations);
  const dataWeeks = useWeeksBetween(dataDTO?.data ?? [], variations);

  const chartData = useMemo(() => {
    return activeDateFormat === "Day" ? dataDays : dataWeeks;
  }, [activeDateFormat, dataDays, dataWeeks]);

  const data = useMemo(() => {
    if (!chartData || chartData.length === 0) return [];

    if (activeLine === ChartVariation.All) {
      return chartData;
    }

    return chartData
      .filter((item) => Object.prototype.hasOwnProperty.call(item, activeLine))
      .map((item) => ({
        name: item.name,
        [activeLine]: item[activeLine],
      }));
  }, [chartData, activeLine]);

  const colors: Record<ChartVariation, string> = {
    [ChartVariation.VariationA]: "var(--variation-a-line)",
    [ChartVariation.VariationB]: "var(--variation-b-line)",
    [ChartVariation.VariationC]: "var(--variation-c-line)",
    [ChartVariation.Original]: "var(--original-line)",
    [ChartVariation.All]: "",
  };

  const style = {
    width: "100%",
    maxHeight: "70vh",
    aspectRatio: 1.618,
  };

  const margin = {
    top: 5,
    right: 30,
    left: 20,
    bottom: 5,
  };

  if (!dataDTO) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <>
      <FiltersBar
        activeLine={activeLine}
        activeDateFormat={activeDateFormat}
        setActiveDateFormat={setActiveDateFormat}
        setActiveLine={setActiveLine}
        theme={theme}
        onChangeTheme={setTheme}
        isLoading={isLoading}
        handleExportFunction={handleDownload}
        variations={variations || []}
        activeChartType={activeChartType}
        setActiveChartType={setActiveChartType}
      />
      {activeChartType === ChartType.Line && (
        <ChartLine
          activeLine={activeLine}
          colors={colors}
          data={data}
          variations={variations}
          style={style}
          margin={margin}
          ref={ref}
          customTooltip={
            <CustomTooltip
              active={false}
              payload={[]}
              coordinate={undefined}
              accessibilityLayer={false}
              activeIndex={undefined}
            />
          }
        />
      )}
      {activeChartType === ChartType.Area && (
        <ChartArea
          activeLine={activeLine}
          colors={colors}
          data={data}
          variations={variations}
          style={style}
          margin={margin}
          ref={ref}
          customTooltip={
            <CustomTooltip
              active={false}
              payload={[]}
              coordinate={undefined}
              accessibilityLayer={false}
              activeIndex={undefined}
            />
          }
        />
      )}
    </>
  );
};

export default ChartContainer;
