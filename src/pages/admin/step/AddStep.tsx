import { Steps ,Button  } from 'antd'
import { FunctionComponent, lazy, Suspense, useState } from 'react'
import { HomeOutlined ,ArrowRightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
const AddClientPage = lazy(() => import('../client/AddClientPage'));
const AddTransanctionPage = lazy(() => import('../transaction/AddTransanctionPage'));
const AddDetailPage = lazy(() => import('./AddDetailPage'));
const AddFacturePage = lazy(() => import('./AddFacturePage'));
const AddMailPage = lazy(() => import('./AddMailPage'));

const {Step} = Steps

const AddForms: FunctionComponent = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNextPage = () => {
      setCurrentStep(currentStep + 1);
    };
  
    const handlePreviousPage = () => {
      setCurrentStep(currentStep - 1);
    };
    
  return (
    <div>
        <div className='w-full fixed bottom-7'>
          <Link to='/admin/page'>
          <button
            >
              <HomeOutlined className='fixed top-4 right-10 p-2 rounded-full text-white text-xl  hover:scale-105 hover:text-opacity-100  transition duration-300' style={{ backgroundColor: 'rgba(0,0,0,.25)' }} />
          </button>
          </Link>
          <div className='mx-10'>
            <Steps current={currentStep}>
              <Step title="Client" status={currentStep > 0 ? 'finish' : 'process'} />
              <Step title="Transaction" status={currentStep > 1 ? 'finish' : currentStep === 1 ? 'process' : 'wait'} />
              <Step title="Detail" status={currentStep > 2 ? 'finish' : currentStep === 2 ? 'process' : 'wait'} />
              <Step title="Facture" status={currentStep > 3 ? 'finish' : currentStep === 3 ? 'process' : 'wait'} />
              <Step title="Mail" status={currentStep > 4 ? 'finish' : currentStep === 4 ? 'process' : 'wait'} />
            </Steps>
          </div>
        </div>
          {/* Contenu de la page actuelle */}
          {currentStep === 0 && (
            <div>
              <Suspense fallback={<div className='text-center'>Chargement...</div>}>
                <AddClientPage  handlePrev={handlePreviousPage} handleNext={handleNextPage}/>
                <Button className='mr-10 float-right mb-32' onClick={handleNextPage}>Ignorer <ArrowRightOutlined/> </Button>
              </Suspense>
            </div>
          )}
          {currentStep === 1 && (
            <div>
              <Suspense fallback={<div className='text-center'>Chargement...</div>}>
                <AddTransanctionPage handlePrev={handlePreviousPage} handleNext={handleNextPage}/>
                <Button className='mr-10 float-right mb-32' onClick={handleNextPage}>Ignorer <ArrowRightOutlined/> </Button>
              </Suspense>
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <Suspense fallback={<div className='text-center'>Chargement...</div>}>
                <AddDetailPage  handlePrev={handlePreviousPage} handleNext={handleNextPage}/>
                <Button className='mr-10 float-right mb-32' onClick={handleNextPage}>Ignorer <ArrowRightOutlined/> </Button>
              </Suspense>
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <Suspense fallback={<div className='text-center'>Chargement...</div>}>
                <AddFacturePage  handlePrev={handlePreviousPage} handleNext={handleNextPage}/>
                <Button className='mr-10 float-right  mb-32' onClick={handleNextPage}>Envoyer facture par mail <ArrowRightOutlined/> </Button>
              </Suspense>
            </div>
          )}
           {currentStep === 4 && (
            <div>
              <Suspense fallback={<div className='text-center'>Chargement...</div>}>
                  <AddMailPage  handlePrev={handlePreviousPage} handleNext={handleNextPage}/>
              </Suspense>
            </div>
          )}
        </div>
  )
}

export default AddForms