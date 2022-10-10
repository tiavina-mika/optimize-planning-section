import { cloneDeep } from "lodash";
import { useCallback, useEffect, useState } from "react";
import {
  difficultiesGesters,
  showDaysCards as showDaysCardsData,
  stateData
} from "./data";
import ProductionPlanningSectionInfos from "./ProductionPlanningSectionInfos";
import ProductionPlanningSectionInfos2 from "./ProductionPlanningSectionInfos2";
import "./styles.css";
import {
  countProduction,
  getAverageDifficulty,
  getDifficulty,
  getSumGesters
} from "./utils";

const section = {
  key: "CHEESE",
  label: "Fromage"
};

const App = ({ sections }) => {
  const [productData, setProductData] = useState([]);
  const [showDaysCards] = useState(showDaysCardsData); // simulate useSelector

  const getProductData = useCallback(() => {
    const finalData = [];

    for (const i in showDaysCards) {
      const currentDay = showDaysCards[i];
      const productTypesData = [];
      let totalIntern = 0;
      let totalExtern = 0;

      for (const j in sections) {
        const currentSection = sections[j];
        const sectionCards = currentDay.cards[currentSection.key];
        const capacity = currentDay.capacities
          ? currentDay.capacities.find((el) => el.key === currentSection.key)
          : null;

        const sectionCapacity = capacity ? capacity.value : null;

        const intern = sectionCards
          ? sectionCards.filter((card) => card.itemType === "Recipe")
          : [];
        const extern = sectionCards
          ? sectionCards.filter(
              (card) => card.itemType === "SubcontractorProduct"
            )
          : [];

        const internProd = countProduction(intern);
        const externProd = countProduction(extern);

        const {
          recipeNumber: nbDiff1,
          totalNumber: difficulty1
        } = getDifficulty(intern, difficultiesGesters, 1);
        const {
          recipeNumber: nbDiff2,
          totalNumber: difficulty2
        } = getDifficulty(intern, difficultiesGesters, 2);
        const {
          recipeNumber: nbDiff3,
          totalNumber: difficulty3
        } = getDifficulty(intern, difficultiesGesters, 3);
        const averageDifficulty = getAverageDifficulty(
          difficulty1,
          difficulty2,
          difficulty3
        );
        const sumGesters = getSumGesters(intern, difficultiesGesters);

        totalIntern += intern.length;
        totalExtern += extern.length;

        productTypesData.push({
          intern: intern.length,
          extern: extern.length,
          internProd: internProd,
          externProd: externProd,
          sectionCapacity: sectionCapacity,
          total: intern.length + extern.length,
          expectedSale: 0,
          label: currentSection.label,
          key: currentSection.key,
          difficulty1: nbDiff1,
          difficulty2: nbDiff2,
          difficulty3: nbDiff3,
          averageDifficulty,
          sumGesters
        });
      }

      finalData.push({
        date: currentDay.date,
        totalIntern: totalIntern,
        totalExtern: totalExtern,
        productTypesData: productTypesData
      });
    }

    return finalData;
  }, [sections, showDaysCards]);

  useEffect(() => {
    setProductData(getProductData(sections));
  }, [sections, getProductData]);

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
    setProductData(copy);
  };

  // const productData = getProductData(sections)
  // console.log('productData', productData)
  // console.log('stateData', stateData)
  // console.log('isequal', isEqual(productData, stateData))

  return (
    <div className="App">
      {/* ----- old production planning section ----- */}
      <div>
        <h4>ProductionPlanningSectionInfos</h4>
        <ProductionPlanningSectionInfos
          data={productData}
          section={section}
          updateInternCapacity={_updateInternCapacity}
        />
      </div>
      {/* ----- new production planning section ----- */}
      <div>
        <h4>Optimized ProductionPlanningSectionInfos</h4>
        <ul>
          {productData.map((item, index) => (
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
