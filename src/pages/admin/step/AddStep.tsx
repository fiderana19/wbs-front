import { Steps, Button } from "antd";
import { FunctionComponent, lazy, Suspense, useState } from "react";
import {
  HomeOutlined,
  ArrowRightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDark } from "../../../context/DarkThemeContext";
const AddClientPage = lazy(() => import("../client/AddClientPage"));
const AddTransanctionPage = lazy(
  () => import("../transaction/AddTransanctionPage"),
);
const AddDetailPage = lazy(() => import("./AddDetailPage"));
const ToggleTheme = lazy(() => import("../../../components/ToggleTheme"));

const { Step } = Steps;

const AddForms: FunctionComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { isDark } = useDark();

  const handleNextPage = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousPage = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className={isDark ? "h-full" : ""}>
      <div>
        <div className="fixed top-5 right-10">
          <Suspense
            fallback={
              <div className="text-xl">
                <LoadingOutlined />
              </div>
            }
          >
            <ToggleTheme />
          </Suspense>
        </div>
        <Link to="/admin/page">
          <button>
            <HomeOutlined
              className="fixed top-4 right-28 p-2 rounded-full text-white text-xl  hover:scale-105 hover:text-opacity-100  transition duration-300"
              style={{ backgroundColor: "rgba(0,0,0,.25)" }}
            />
          </button>
        </Link>
        <div className="absolute bottom-6 w-5/6 left-6">
          <Steps current={currentStep}>
            <Step
              title="Client"
              status={currentStep > 0 ? "finish" : "process"}
            />
            <Step
              title="Transaction"
              status={
                currentStep > 1
                  ? "finish"
                  : currentStep === 1
                    ? "process"
                    : "wait"
              }
            />
            <Step
              title="Detail"
              status={
                currentStep > 2
                  ? "finish"
                  : currentStep === 2
                    ? "process"
                    : "wait"
              }
            />
          </Steps>
        </div>
      </div>
      {/* Contenu de la page actuelle */}
      {currentStep === 0 && (
        <div>
          <Suspense
            fallback={
              <div className="text-center my-10">
                <LoadingOutlined className="text-5xl" />
              </div>
            }
          >
            <AddClientPage
              handlePrev={handlePreviousPage}
              handleNext={handleNextPage}
            />
            <Button className="ml-20 fixed right-0" onClick={handleNextPage}>
              Ignorer <ArrowRightOutlined />{" "}
            </Button>
          </Suspense>
        </div>
      )}
      {currentStep === 1 && (
        <div className={isDark ? "h-full" : ""}>
          <Suspense
            fallback={
              <div className="text-center my-10">
                <LoadingOutlined className="text-5xl" />
              </div>
            }
          >
            <AddTransanctionPage
              handlePrev={handlePreviousPage}
              handleNext={handleNextPage}
            />
            <Button
              className="ml-10 fixed bottom-20 right-2"
              onClick={handleNextPage}
            >
              Ignorer <ArrowRightOutlined />{" "}
            </Button>
          </Suspense>
        </div>
      )}
      {currentStep === 2 && (
        <div className={isDark ? "h-full" : ""}>
          <Suspense
            fallback={
              <div className="text-center my-10">
                <LoadingOutlined className="text-5xl" />
              </div>
            }
          >
            <AddDetailPage handlePrev={handlePreviousPage} />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default AddForms;
