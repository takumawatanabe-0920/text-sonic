import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

interface AccordionItemProps {
  title: string;
  description: string;
}

const AccordionItem: React.FC<AccordionItemProps> = (props) => {
  const { title, description } = props;
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        {title}
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{description} </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionItem;
