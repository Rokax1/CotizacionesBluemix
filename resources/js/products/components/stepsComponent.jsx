import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { useConfirm } from 'material-ui-confirm';
import Typography from '@material-ui/core/Typography';
import { StepContent, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


export default function HorizontalLinearStepper(props) {
  const classes = useStyles();
  const confirm = useConfirm();
  const {saveCotizacion} = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const {steps} = props;
  const {stepsContent} = props;
  const {pdf} = props;
  const {disabled} = props
  const handleNext = () => {
    
    if(activeStep == 1){
      confirm({ description: 'Se generará la cotización, no puedes volver atras, ¿Continuar?' })
      .then(() => { 
        saveCotizacion();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
       })
      .catch(() => { 
        //;
       });
      
    }else{
      setActiveStep((prevActiveStep) => prevActiveStep + +1)
    }
    
  };

  const linkPdf = () => {
      window.open(pdf.pdf)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getTextButton = () => {
    switch (activeStep) {
      case 0:
        return 'Confirmar Productos'
        break;
      case 1:
        return 'Confirmar Datos y Generar Cotización'
      case 2:
        return 'Imprimir'
        break;
      default:
        return '---'
        break;
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical" style={{marginLeft:'0', padding:0}}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
              <StepContent>
                {stepsContent(activeStep)}
              </StepContent>
              
            </Step>
          );
        })}
      </Stepper>
      <Divider style={{margin:'20px'}}/>
       <div>
              <Button disabled={activeStep === 0 || activeStep === 2} onClick={handleBack} className={classes.button}>
                Atras
              </Button>

              <Button
                disabled={activeStep === 2 ? false : !disabled }
                variant={ activeStep === 2 ? 'contained' : 'outlined'}
                color="primary"
                onClick={activeStep === 2 ? linkPdf : handleNext }
                className={classes.button}
              >
                {
                 getTextButton()
                }
              </Button>
            </div>
    </div>
  );
}