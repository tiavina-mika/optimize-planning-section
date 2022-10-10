const ProductionPlanningSectionInfos2 = ({
  sectionData,
  item,
  updateSectionCapacity,
  updateInternCapacity
}) => {
  const saveSectionCapacity = (event, item, currentProductTypeData) => {
    if (!event.target.value) return;
    const newCurrentProductTypeData = {
      ...currentProductTypeData,
      sectionCapacity: event.target.value
    };
    updateInternCapacity(
      parseFloat(event.target.value),
      item,
      newCurrentProductTypeData
    );
  };

  return (
    <li>
      <span>{sectionData.key}</span>
      <input
        type="number"
        onChange={(event) => {
          updateSectionCapacity(event, item, sectionData);
        }}
        onBlur={(event) => {
          saveSectionCapacity(event, item, sectionData);
        }}
      />
    </li>
  );
};

export default ProductionPlanningSectionInfos2;
