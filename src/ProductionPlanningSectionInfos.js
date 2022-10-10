import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";

const ProductionPlanningSectionInfos = ({
  data,
  section,
  updateInternCapacity
}) => {
  const [stateData, setStateData] = useState(cloneDeep(data) || []);

  useEffect(() => {
    setStateData(cloneDeep(data));
  }, [data]);

  const updateSectionCapacity = (event, item, currentProductTypeData) => {
    const copy = cloneDeep(stateData);
    const currentItem = copy.find((el) => el.date === item.date);
    const currentProductType = currentItem.productTypesData.find(
      (el) => el.key === currentProductTypeData.key
    );

    currentProductType.sectionCapacity = event.target.value;
    setStateData(copy);
  };

  const saveSectionCapacity = (event, item, currentProductTypeData) => {
    if (!event.target.value) return;
    updateInternCapacity(
      parseFloat(event.target.value),
      item,
      currentProductTypeData
    );
  };

  return (
    <ul>
      {stateData.map((item, index) => {
        const currentProductTypeData = item.productTypesData.find(
          (productType) => productType.key === section.key
        );
        if (currentProductTypeData) {
          return (
            <li key={index}>
              <span>{currentProductTypeData.key}</span>
              <input
                type="number"
                onChange={(event) => {
                  updateSectionCapacity(event, item, currentProductTypeData);
                }}
                onBlur={(event) => {
                  saveSectionCapacity(event, item, currentProductTypeData);
                }}
              />
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
};

export default ProductionPlanningSectionInfos;
