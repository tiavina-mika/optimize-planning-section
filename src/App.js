import { stateData } from "./data";
import ProductionPlanningSectionInfos from "./ProductionPlanningSectionInfos";
import ProductionPlanningSectionInfos2 from "./ProductionPlanningSectionInfos2";
import "./styles.css";

const section = {
  key: "CHEESE",
  label: "Fromage"
};

const App = () => {
  return (
    <div className="App">
      {/* ----- old production planning section ----- */}
      <div>
        <h4>ProductionPlanningSectionInfos</h4>
        <ProductionPlanningSectionInfos data={stateData} section={section} />
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
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
