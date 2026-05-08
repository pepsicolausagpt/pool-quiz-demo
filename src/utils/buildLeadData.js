import { LEAD_SOURCE } from "../config/constants";

export function buildLeadData(formData) {
  const createdAt = new Date().toISOString();
  const contact = {
    fullName: formData.fullName?.trim() || "",
    deliveryCity: formData.deliveryCity?.trim() || "",
    phone: formData.phone?.trim() || "",
    email: formData.email?.trim() || "",
  };

  const common = {
    source: LEAD_SOURCE,
    location: formData.location,
    equipmentSolution: formData.equipmentSolution,
    equipmentItems: formData.equipmentItems,
    waterDisinfection: formData.waterDisinfection,
    counterflow: formData.counterflow,
    waterHeating: formData.waterHeating,
    additionalItems: formData.additionalItems,
    promotion: formData.promotion,
    implementationTime: formData.implementationTime,
    budgetLevel: formData.budgetLevel,
    budgetLimit: formData.budgetLimit,
    comment: formData.comment?.trim() || "",
    contact,
    createdAt,
  };

  if (formData.branch === "custom_large_pool") {
    return {
      ...common,
      branch: "custom_large_pool",
      customPool: {
        width: formData.poolWidth,
        length: formData.poolLength,
        depth: formData.poolDepth,
        linerType: formData.linerType,
      },
    };
  }

  return {
    ...common,
    branch: "catalog",
    poolType: formData.poolType,
    selectedModel: formData.selectedModel || null,
    implementationScheme: formData.implementationScheme,
  };
}
