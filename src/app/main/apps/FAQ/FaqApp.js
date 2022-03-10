import { useEffect, useMemo, useState } from "react";
import FuseUtils from "@fuse/utils";
import { motion } from "framer-motion";
import ProcedureFAQs from "app/main/constants/ProcedureFAQs";
import VocabularyFAQs from "app/main/constants/VocabularyFAQs";

//material-ui
import { styled } from "@mui/material/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Icon,
  Input,
  Paper,
  Typography
} from "@mui/material";

const Root = styled("div")(({ theme }) => ({
  "& .FaqPage-header": {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText
  },

  "& .FaqPage-panel": {
    margin: 0,
    border: "none",
    "&:before": {
      display: "none"
    },
    "&:first-of-type": {
      borderRadius: "20px 20px 0 0"
    },
    "&:last-of-type": {
      borderRadius: "0 0 20px 20px"
    },

    "&.Mui-expanded": {
      margin: "auto"
    }
  }
}));

function FaqApp() {
  const [data, setData] = useState({
    procedureFAQ: [],
    vocabularyFAQ: []
  });
  const [filteredData, setFilteredData] = useState({
    procedureFAQ: [],
    vocabularyFAQ: []
  });
  const [expanded, setExpanded] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setData({ procedureFAQ: ProcedureFAQs, vocabularyFAQ: VocabularyFAQs });
  }, []);

  useEffect(() => {
    function getFilteredArray(arr, _searchText) {
      if (_searchText.length === 0) {
        return arr;
      }
      return {
        procedureFAQ: FuseUtils.filterArrayByString(
          arr.procedureFAQ,
          _searchText
        ),
        vocabularyFAQ: FuseUtils.filterArrayByString(
          arr.vocabularyFAQ,
          _searchText
        )
      };
    }
    setFilteredData(getFilteredArray(data, searchText));
  }, [data, searchText]);

  const toggleAccordion = (panel) => (event, _expanded) => {
    setExpanded(_expanded ? panel : false);
  };

  function handleSearch(event) {
    setSearchText(event.target.value);
  }

  return (
    <Root className="w-full flex flex-col flex-auto">
      <div className="FaqPage-header flex flex-col shrink-0 items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
        >
          <Typography
            color="inherit"
            className="text-32 sm:text-40 font-bold tracking-tight"
          >
            Foire aux questions
          </Typography>
        </motion.div>

        <Paper className="flex shrink-0 items-center h-56 my-4 rounded-full shadow faq-search">
          <Icon color="action" className="mx-16">
            search
          </Icon>
          <Input
            placeholder="Recherche"
            className=""
            disableUnderline
            fullWidth
            inputProps={{
              "aria-label": "Search"
            }}
            value={searchText}
            onChange={handleSearch}
          />
        </Paper>
      </div>

      <div className="flex flex-col flex-1 shrink-0 max-w-xl w-full mx-auto px-16 sm:px-24 py-24 sm:py-32">
        {filteredData.procedureFAQ.length === 0 &&
          filteredData.vocabularyFAQ.length === 0 && (
            <div className="flex flex-auto items-center justify-center w-full h-full">
              <Typography color="textSecondary" variant="h5">
                There are no faqs!
              </Typography>
            </div>
          )}
        {useMemo(() => {
          const container = {
            show: {
              transition: {
                staggerChildren: 0.05
              }
            }
          };

          const item = {
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 }
          };
          return (
            filteredData.procedureFAQ.length > 0 && (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="shadow rounded-20 mb-5"
              >
                <Typography
                  style={{
                    backgroundColor: "#1b2330",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                  }}
                  variant="subtitle1"
                  color="#ffffff"
                  className="mt-0 sm:pl-24 text-20 sm:text-24 sm:mt-16 mx-auto max-w-912 font-semibold faqcard1-txt"
                >
                  Questions de procédure
                </Typography>
                {filteredData.procedureFAQ.map((faq) => (
                  <Accordion
                    component={motion.div}
                    variants={item}
                    key={faq.id}
                    classes={{
                      root: "FaqPage-panel shadow-0"
                    }}
                    expanded={expanded === faq.id}
                    onChange={toggleAccordion(faq.id)}
                  >
                    <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                      <div className="flex items-center">
                        <Icon color="action">help_outline</Icon>
                        <Typography className="px-12 font-medium">
                          {faq.question}
                        </Typography>
                      </div>
                    </AccordionSummary>

                    <AccordionDetails>
                      <Typography className="text-14 px-32 pb-8 -mt-8">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </motion.div>
            )
          );
        }, [filteredData.procedureFAQ, expanded])}
        
        {useMemo(() => {
          const container = {
            show: {
              transition: {
                staggerChildren: 0.05
              }
            }
          };

          const item = {
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 }
          };
          return (
            filteredData.vocabularyFAQ.length > 0 && (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="shadow rounded-20"
              >
                <Typography
                  style={{
                    backgroundColor: "#1b2330",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                  }}
                  variant="subtitle1"
                  color="#ffffff"
                  className="mt-0 sm:pl-24 text-20 sm:text-24 sm:mt-16 mx-auto max-w-912 font-semibold faqcard2-txt"
                >
                  Questions de vocabulaire
                </Typography>
                {filteredData.vocabularyFAQ.map((faq) => (
                  <Accordion
                    component={motion.div}
                    variants={item}
                    key={faq.id}
                    classes={{
                      root: "FaqPage-panel shadow-0"
                    }}
                    expanded={expanded === faq.id}
                    onChange={toggleAccordion(faq.id)}
                  >
                    <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                      <div className="flex items-center">
                        <Icon color="action">help_outline</Icon>
                        <Typography className="px-12 font-medium">
                          {faq.question}
                        </Typography>
                      </div>
                    </AccordionSummary>

                    <AccordionDetails>
                      <Typography className="text-14 px-32 pb-8 -mt-8">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </motion.div>
            )
          );
        }, [filteredData.vocabularyFAQ, expanded])}
      </div>
    </Root>
  );
}

export default FaqApp;
