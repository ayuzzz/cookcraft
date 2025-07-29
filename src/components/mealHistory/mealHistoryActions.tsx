import FilterDropdown from "../common/filterDropdown";

type MealHistoryActionsProps = {
    dateOptions: string[];
    mealTypeOptions: string[];
    searchText: string;
    onSearchTextChange: (searchText: string) => void;
    onChangeDate: (date: string) => void;
    onChangeMealType: (mealType: string) => void;
}
export default function MealHistoryActions({dateOptions, mealTypeOptions, searchText, onSearchTextChange, onChangeDate, onChangeMealType}: MealHistoryActionsProps) {

  return (
    <div className="flex justify-between items-center mb-4">
      <input type="text" value={searchText} id="search" placeholder="Search by meal or tag..." className="border p-2 rounded-lg mb-4" onChange={e => onSearchTextChange((e.target as HTMLInputElement).value)} />
      <div className="flex gap-4">
        <FilterDropdown options={dateOptions} onChange={onChangeDate} name="date" id="date-filter" className="border p-2 rounded-lg mb-4" />
        <FilterDropdown options={mealTypeOptions} onChange={onChangeMealType} name="mealType" id="meal-type-filter" className="border p-2 rounded-lg mb-4" />
      </div>
    </div>
  );
}