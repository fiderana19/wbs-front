import { Steps ,Button  } from 'antd'
import { FunctionComponent, useEffect, useState } from 'react'
import { HomeOutlined ,ArrowRightOutlined } from '@ant-design/icons'
import AddClient from './AddClient';
import AddDetail from './AddDetail';
import Addtransaction from './AddTransanction';
import { Link } from 'react-router-dom';
import AddFacture from './AddFacture';
import AddMail from './AddMail';

const {Step} = Steps

const AddForms: FunctionComponent = () => {
    const [currentStep, setCurrentStep] = useState(0);
    //handling next or prev page
    const handleNextPage = () => {
      setCurrentStep(currentStep + 1);
    };
  
    const handlePreviousPage = () => {
      setCurrentStep(currentStep - 1);
    };
    
    useEffect(() => {  
     
    }, [])
 
  return (
    <div>
        <div className='w-full fixed bottom-7'>
          <Link to='/'>
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
              <AddClient  handlePrev={handlePreviousPage} handleNext={handleNextPage}/>
              <Button className='mr-10 float-right mb-32' onClick={handleNextPage}>Ignorer <ArrowRightOutlined/> </Button>
            </div>
          )}
          {currentStep === 1 && (
            <div>
              <Addtransaction handlePrev={handlePreviousPage} handleNext={handleNextPage}/>
              <Button className='mr-10 float-right mb-32' onClick={handleNextPage}>Ignorer <ArrowRightOutlined/> </Button>
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <AddDetail  handlePrev={handlePreviousPage} handleNext={handleNextPage}/>
              <Button className='mr-10 float-right mb-32' onClick={handleNextPage}>Ignorer <ArrowRightOutlined/> </Button>
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <AddFacture  handlePrev={handlePreviousPage} handleNext={handleNextPage}/>
              <Button className='mr-10 float-right  mb-32' onClick={handleNextPage}>Envoyer facture par mail <ArrowRightOutlined/> </Button>
            </div>
          )}
           {currentStep === 4 && (
            <div>
              <AddMail  handlePrev={handlePreviousPage} handleNext={handleNextPage}/>
            </div>
          )}
        </div>
  )
}

export default AddForms