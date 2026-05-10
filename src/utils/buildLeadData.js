import { LEAD_SOURCE } from "../config/constants";

export function buildLeadData(formData) {
  const createdAt = new Date().toISOString();
  const contact = {
    fullName: formData.fullName?.trim() || "",
    deliveryCity: formData.deliveryCity?.trim() || "",
    phone: formData.phone?.trim() || "",
    email: formData.email?.trim() || "",
  };

  return {
    source: LEAD_SOURCE,
    location: formData.location,

    equipmentItems: formData.equipmentItems,
    waterDisinfection: formData.waterDisinfection,
    counterflow: formData.counterflow,
    waterHeating: formData.waterHeating,
    additionalItems: formData.additionalItems,
    implementationTime: formData.implementationTime,
    budgetLevel: formData.budgetLevel,
    budgetLimit: formData.budgetLimit,
    comment: formData.comment?.trim() || "",
    contact,
    createdAt,
    branch: "catalog",
    poolType: formData.poolType,
    selectedModel: formData.selectedModel
      ? {
          name: formData.selectedModel.name,
          diameter: formData.selectedModel.diameter,
          length: formData.selectedModel.length,
          width: formData.selectedModel.width,
          extraSpec: formData.selectedModel.extraSpec,

          poolPrice: formData.selectedModel.poolPrice,
        }
      : null,
    implementationScheme: formData.implementationScheme,
  };
}
