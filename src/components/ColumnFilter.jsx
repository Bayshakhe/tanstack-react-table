const ColumnFilter = ({ column }) => {
  const { filterValue, setFilterValue } = column;
  // console.log(column);
  return (
    <span>
      Search:
      <input
        type="text"
        style={{ width: "80%", display: "block" }}
        value={filterValue || ""}
        onChange={(e) => setFilterValue(e.target.value)}
      />
    </span>
  );
};

export default ColumnFilter;
