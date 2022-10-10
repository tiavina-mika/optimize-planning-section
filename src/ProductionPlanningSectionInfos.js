const ProductionPlanningSectionInfos = ({ data, section }) => {
  return (
    <ul>
      {data.map((item, index) => {
        const currentProductTypeData = item.productTypesData.find(
          (productType) => productType.key === section.key
        );
        if (currentProductTypeData) {
          return <li key={index}>{currentProductTypeData.key}</li>;
        }

        return null;
      })}
    </ul>
  );
};

export default ProductionPlanningSectionInfos;
