import { useGetFundsQuery } from "@/features/apis/funds";
import { selectFundToTrade, setFundToTrade } from "@/features/slices/app";
import { Select, Spin } from "antd";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LIMIT = 10;

export default function FundSelect() {
  const [offset, setOffset] = useState(0);
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const fundToTrade = useSelector(selectFundToTrade);

  const { data, isFetching } = useGetFundsQuery({
    limit: LIMIT,
    offset,
    search,
  });

  useEffect(() => {
    if (data) {
      if (offset === 0) {
        setOptions(
          data.map((fund: any) => ({
            label: `${fund.ticker} - ${fund.name}`,
            value: `${fund.id}_${fund.ticker}_${fund.name}_${fund.region}`,
          }))
        );
      } else {
        setOptions((prev) => [
          ...prev,
          ...data.map((fund: any) => ({
            label: `${fund.ticker} - ${fund.name}`,
            value: `${fund.id}_${fund.ticker}_${fund.name}_${fund.region}`,
          })),
        ]);
      }
      if (data.length < LIMIT) {
        setHasMore(false);
      }
    }
  }, [data]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setOffset(0);
        setOptions([]);
        setHasMore(true);
        setSearch(value);
      }, 300),
    []
  );

  return (
    <Select
      showSearch
      style={{ width: "100%" }}
      placeholder="Select a fund"
      notFoundContent={isFetching ? <Spin size="small" /> : null}
      options={options}
      onPopupScroll={handleScroll}
      onSearch={handleSearch}
      filterOption={false}
      value={fundToTrade}
      onChange={(value) => {
        dispatch(setFundToTrade(value));
      }}
    />
  );

  function handleScroll(e: any) {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (
      scrollTop + clientHeight >= scrollHeight - 10 &&
      hasMore &&
      !isFetching
    ) {
      setOffset((prev) => prev + LIMIT);
    }
  }

  function handleSearch(value: string) {
    debouncedSearch(value);
  }
}
