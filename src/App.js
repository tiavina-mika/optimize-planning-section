import { cloneDeep } from "lodash";
import { useCallback } from "react";
import { stateData } from "./data";
import ProductionPlanningSectionInfos from "./ProductionPlanningSectionInfos";
import ProductionPlanningSectionInfos2 from "./ProductionPlanningSectionInfos2";
import "./styles.css";

const section = {
  key: "CHEESE",
  label: "Fromage"
};

const App = () => {
  const _updateInternCapacity = useCallback((value, item, productTypeData) => {
    console.log(productTypeData);
    // console.log({ value, item, productTypeData: productTypeData.sectionCapacity })
  }, []);

  // this is only used for the new optimized component
  const _updateSectionCapacity = (event, item, sectionData) => {
    const copy = cloneDeep(stateData);
    const currentItem = copy.find((el) => el.date === item.date);
    const currentProductType = currentItem.productTypesData.find(
      (productType) => productType.key === sectionData.key
    );

    currentProductType.sectionCapacity = event.target.value;
    // setStateData(copy)
  };

  return (
    <div className="App">
      {/* ----- old production planning section ----- */}
      <div>
        <h4>ProductionPlanningSectionInfos</h4>
        <ProductionPlanningSectionInfos
          data={stateData}
          section={section}
          updateInternCapacity={_updateInternCapacity}
        />
      </div>
      {/* ----- new production planning section ----- */}
      <div>
        <h4>Optimized ProductionPlanningSectionInfos</h4>
        <ul>
          {stateData.map((item, index) => (
            <ProductionPlanningSectionInfos2
              key={index}
              sectionData={item.productTypesData.find(
                (productType) => productType.key === section.key
              )}
              updateInternCapacity={_updateInternCapacity}
              updateSectionCapacity={_updateSectionCapacity}
              item={item}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
