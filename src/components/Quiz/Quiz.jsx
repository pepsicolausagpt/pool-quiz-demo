import { useMemo, useState } from "react";
import { buildLeadData } from "../../utils/buildLeadData";
import { isStepValid, validateStep } from "../../utils/validation";
import { submitLead } from "../../utils/submitLead";
import AdditionalStep from "./AdditionalStep";
import BudgetStepCatalog from "./BudgetStepCatalog";
import BudgetStepCustom from "./BudgetStepCustom";
import ContactStep from "./ContactStep";
import CustomSizeStep from "./CustomSizeStep";
import EquipmentStep from "./EquipmentStep";
import LocationStep from "./LocationStep";
import ModelStep from "./ModelStep";
import PoolTypeStep from "./PoolTypeStep";
import ProgressBar from "./ProgressBar";
import StartScreen from "./StartScreen";
import SuccessScreen from "./SuccessScreen";

const createInitialFormData = () => ({
  branch: "catalog",
  poolType: null,
  selectedModel: null,
  poolWidth: "",
  poolLength: "",
  poolDepth: "",
  linerType: "",
  location: "",
  equipmentSolution: "",
  equipmentItems: [],
  waterDisinfection: [],
  counterflow: "no",
  waterHeating: "no",
  additionalItems: [],
  promotion: "no",
  implementationTime: "",
  budgetLevel: "",
  implementationScheme: "",
  budgetLimit: "",
  comment: "",
  fullName: "",
  deliveryCity: "",
  phone: "",
  email: "",
});

const catalogSteps = ["poolType", "model", "location", "equipment", "additional", "budgetCatalog", "contact"];
const customSteps = ["poolType", "customSize", "location", "equipment", "additional", "budgetCustom", "contact"];

export default function Quiz() {
  const [screen, setScreen] = useState("start");
  const [formData, setFormData] = useState(createInitialFormData);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const steps = useMemo(
    () => (formData.branch === "custom_large_pool" ? customSteps : catalogSteps),
    [formData.branch],
  );
  const currentStep = steps[currentStepIndex] || steps[0];
  const errors = showErrors ? validateStep(currentStep, formData) : {};
  const canGoNext = isStepValid(currentStep, formData);

  const resetQuiz = () => {
    setFormData(createInitialFormData());
    setCurrentStepIndex(0);
    setShowErrors(false);
    setIsSubmitting(false);
    setSubmitError("");
  };

  const startQuiz = () => {
    resetQuiz();
    setScreen("quiz");
  };

  const restartQuiz = () => {
    resetQuiz();
    setScreen("start");
  };

  const closeQuiz = () => {
    resetQuiz();
    setScreen("start");
  };

  const updateField = (field, value) => {
    if (submitError) {
      setSubmitError("");
    }

    setFormData((previous) => {
      const next = { ...previous, [field]: value };

      if (field === "location") {
        const defaultOutdoor = "tech_compartment_outdoor";
        const defaultIndoor = "tech_stand_indoor";
        const canReplaceDefault =
          !previous.equipmentSolution ||
          previous.equipmentSolution === defaultOutdoor ||
          previous.equipmentSolution === defaultIndoor;

        if (canReplaceDefault) {
          next.equipmentSolution = value === "outdoor" ? defaultOutdoor : defaultIndoor;
        }
      }

      return next;
    });
  };

  const handlePoolTypeChange = (poolType) => {
    setFormData((previous) => {
      const isCustom = poolType.id === "custom_large_pool";

      return {
        ...previous,
        branch: isCustom ? "custom_large_pool" : "catalog",
        poolType: poolType.id,
        selectedModel: null,
        poolWidth: isCustom ? previous.poolWidth : "",
        poolLength: isCustom ? previous.poolLength : "",
        poolDepth: isCustom ? previous.poolDepth : "",
        linerType: isCustom ? previous.linerType : "",
        implementationScheme: isCustom ? "" : previous.implementationScheme,
        budgetLimit: "",
      };
    });
    setShowErrors(false);
  };

  const backToCatalogTypes = () => {
    setFormData((previous) => ({
      ...previous,
      branch: "catalog",
      poolType: null,
      selectedModel: null,
      poolWidth: "",
      poolLength: "",
      poolDepth: "",
      linerType: "",
      budgetLimit: "",
    }));
    setCurrentStepIndex(0);
    setShowErrors(false);
  };

  const goBack = () => {
    setShowErrors(false);
    if (currentStepIndex === 0) {
      closeQuiz();
      return;
    }
    setCurrentStepIndex((previous) => Math.max(previous - 1, 0));
  };

  const goNext = async () => {
    const nextErrors = validateStep(currentStep, formData);
    setShowErrors(true);
    setSubmitError("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (currentStep === "contact") {
      setIsSubmitting(true);
      const leadData = buildLeadData(formData);
      try {
        await submitLead(leadData);
        setScreen("success");
      } catch (error) {
        setSubmitError(error.message || "Не удалось отправить заявку. Попробуйте еще раз.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    setShowErrors(false);
    setCurrentStepIndex((previous) => Math.min(previous + 1, steps.length - 1));
  };

  const renderStep = () => {
    if (currentStep === "poolType") {
      return <PoolTypeStep formData={formData} onPoolTypeChange={handlePoolTypeChange} error={errors.poolType} />;
    }

    if (currentStep === "model") {
      return (
        <ModelStep
          formData={formData}
          onFieldChange={updateField}
          error={errors.selectedModel}
        />
      );
    }

    if (currentStep === "customSize") {
      return (
        <CustomSizeStep
          formData={formData}
          onFieldChange={updateField}
          errors={errors}
          onBackToCatalog={backToCatalogTypes}
        />
      );
    }

    if (currentStep === "location") {
      return <LocationStep formData={formData} onFieldChange={updateField} error={errors.location} />;
    }

    if (currentStep === "equipment") {
      return <EquipmentStep formData={formData} onFieldChange={updateField} />;
    }

    if (currentStep === "additional") {
      return <AdditionalStep formData={formData} onFieldChange={updateField} />;
    }

    if (currentStep === "budgetCatalog") {
      return <BudgetStepCatalog formData={formData} onFieldChange={updateField} errors={errors} />;
    }

    if (currentStep === "budgetCustom") {
      return <BudgetStepCustom formData={formData} onFieldChange={updateField} errors={errors} />;
    }

    return <ContactStep formData={formData} onFieldChange={updateField} errors={errors} />;
  };

  if (screen === "start") {
    return <StartScreen onStart={startQuiz} />;
  }

  if (screen === "success") {
    return <SuccessScreen onRestart={startQuiz} />;
  }

  return (
    <main className="quiz-shell">
      <div className="quiz-shell__photo" aria-hidden="true" />
      <section className="quiz-panel">
        <div className="quiz-panel__top">
          <ProgressBar current={currentStepIndex} total={steps.length} />
          <button className="icon-button" type="button" onClick={closeQuiz} aria-label="Закрыть квиз">
            ×
          </button>
        </div>
        {renderStep()}
        {submitError ? <p className="submit-error">{submitError}</p> : null}
        <div className="quiz-actions">
          <button className="button button--ghost" type="button" onClick={goBack}>
            Назад
          </button>
          <span className="secure-note">Ваши данные защищены и не передаются третьим лицам</span>
          <button
            className="button button--primary"
            type="button"
            onClick={goNext}
            disabled={!canGoNext || isSubmitting}
          >
            {currentStep === "contact" ? (isSubmitting ? "Отправляем..." : "Отправить заявку") : "Далее"}
          </button>
        </div>
      </section>
    </main>
  );
}
