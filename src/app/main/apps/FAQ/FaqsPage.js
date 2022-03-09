import FuseUtils from "@fuse/utils";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Icon from "@mui/material/Icon";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { setDossiersSearchText } from "app/store/slices/dossiersSlice";
import { useDispatch, useSelector } from "react-redux";

const Root = styled("div")(({ theme }) => ({
  "& .FaqsPage-header": {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
  },

  "& .FaqsPage-panel": {
    margin: 0,
    border: "none",
    "&:before": {
      display: "none",
    },
    "&:first-of-type": {
      borderRadius: "20px 20px 0 0",
    },
    "&:last-of-type": {
      borderRadius: "0 0 20px 20px",
    },

    "&.Mui-expanded": {
      margin: "auto",
    },
  },
}));

function FaqsPage() {
  const procedureData = [
    {
      id: 1,
      question: "Comment se déroule la procédure devant la Cour d'appel ?",
      answer:
        "La procédure débute avec la déclaration d'appel. C'est l'acte par lequel l'appelant(e) saisit la Cour d'appel.Ensuite, l’appelant(e) dispose d’un délai de 3 mois à compter de la date de la déclaration d’appel pour faire connaître ses arguments au soutien de son appel, sous la forme de « conclusions »,L’intimé(e) disposera ensuite d’un délai de 2 mois pour répliquer aux arguments de l’appelant, toujours sous forme de « conclusions »,L’appelant(e) disposera ensuite d’un nouveau délai de 2 mois pour notifier de nouvelles conclusions, le cas échéant.Après ces échanges, la Cour fixera la date de clôture et celle des plaidoiries.Le délai pour plaider est d’environ 18 à 24 mois devant la Cour d’appel.La Cour rendra sa décision, appelée « arrêt », 6 à 8 semaines environ après la date des plaidoiries.",
    },
    {
      id: 2,
      question: "Qu'est-ce que la clôture ?",
      answer:
        "C''est la fin de la mise en état. La juridiction informe les avocats de la date à laquelle elle envisage de la prononcer.Cela signifie que les avocats doivent, avant que la clôture n'intervienne, faire connaître leurs ultimes arguments et communier les dernières pièces.Aucun échange ne pourra, normalement, avoir lieu postérieurement à cette date.Ainsi, la juridiction pourra considérer que l’affaire est «?en état?» d’être plaidée et fixer la date des plaidoiries.",
    },
    {
      id: 3,
      question: "Qu'est-ce que la mise en état ?",
      answer:
        "Devant les Tribunaux de grande instance et les Cours d'appel, la procédure est essentiellement écrite.L'instance est initiée par la délivrance de l'assignation et la saisine de la juridiction.Ensuite, les parties au procès vont ferrailler à coup d'arguments et de pièces justificatives.Ces échanges se déroulent sous la houlette du Tribunal qui fixe le calendrier.Par exemple : la partie en défense doit faire connaître ses arguments le 9 septembre prochain, au plus tard ; la partie en demande devra répliquer avant le 14 novembre suivant, etcCe processus d'échange est appelé mise en état. Il est organisé par la juridiction qu veille au respect du calendrier fixé à l'occasion des audiences de mise en état, aussi appelées audiences de procédure.Lorsque les parties au litige auront épuisé leurs arguments le dossier sera en éta d'être plaidé.",
    },
    {
      id: 4,
      question: "Qu'est-ce que le délibéré ?",
      answer:
        "C'est le moment pendant lequel la juridiction prépare sa décision.Après avoir écouté les plaidoiries des avocats, le ou les juges examine(nt) les conclusions des avocats et les pièces du dossier afin de rendre sa (leur) décision, appelée jugement (pour les Tribunaux) ou arrêt (pour les Cours).Généralement, à la fin de l'audience de plaidoiries, les avocats sont informé de la date du délibéré, c'st à dire à laquelle la décision sera rendue.ON dit que l'affaire a été mise en délibéré au 9 avril prochain, ce qui signifie que la décision sera rendue à cette date.",
    },
  ];

  const vocabularyData = [
    {
      vocId: 11,
      question: "Qu'est que l'article 700 du Code de procédure civile ?",
      answer:
        "Il s'agit du texte qui permet de demander au Tribunal de condamner l'adversaire à vous verser une somme d'argent afin de vous dédommager des frais de procédure, d'avocat notamment, que vous engagez dans le cadre du procès.Le Tribunal accorde une somme forfaitaire, autour de 1.700 € environ pour les Tribunaux de grande instance.",
    },
    {
      vocId: 12,
      question: "Qu'est-ce qu'un avocat postulant ?",
      answer:
        "Devant les Tribunaux de grande instance et les Cours d'appel, les justiciables doivent obligatoirement être représentés par un avocat inscrit dans un barreau correspondant au siège de la juridiction.Exemple : un avocat inscrit au barreau de Paris pour représenter ses clients devant le Tribunal de grande instance de Paris et la Cour d'appel de Paris.Ainsi, les avocats parisiens ne peuvent pas être postulants à Lyon, par exemple.Dans cette hypothèse, l'avocat parisien va faire appel à un confrère lyonnais, qui deviendra avocat postulant. L’avocat postulant accomplit alors les actes de procédure auprès de la juridiction, tels que le placement de l’assignation ou la notification des conclusions.L'avocat parisien, dit avocat plaidant rédigera tous les actes de la procédure et se chargera de plaider le dossier, le moment venu. ",
    },
    {
      vocId: 13,
      question: "Qu'est-ce qu'une audience ?",
      answer:
        "L'audience est un rendez-vous judiciaire. Sa date, son heure et son lieu sont fixés par la juridiction.  L'audience peut être de mise en état, aussi appelée  audience de procédure ou de plaidoiries.  Les audiences de mise en état ou de procédure sont simplement des étapes à l'occasion desquelles le magistrat vérifie le bon déroulement du processus de mise en état.  L'audience des plaidoiries est celle au cours de laquelle la juridiction entend les plaidoiries des avocats, avant de mettre l'affaire en délibéré.",
    },
    {
      vocId: 14,
      question: "Que sont les conclusions ?",
      answer:
        "C'est le nom que l'on donne au document rédigé par un avocat portant l'argumentation de son client.  Les conclusions peuvent être en réplique, récapitulatives, etc. Elles sont systématiquement transmises à la partie adverse qui a le droit d'en prendre connaissance et d'y répondre, par des conclusions, si elle le souhaite.",
    },
    {
      vocId: 15,
      question: "Qui est l'appelant(e) ?",
      answer:
        "Celui ou celle qui saisit la Cour d'appel d'un recours contre un jugement.  Pour saisir la Cour d'appel, l'appelant(e) régularise, par l’intermédiaire de son avocat, une déclaration d'appel.",
    },
    {
      vocId: 16,
      question: "Qui est l'intimé(e) ?",
      answer:
        "Celui ou celle qui est attrait devant la Cour d'appel par l'appelant ou l'appelante.",
    },
    {
      vocId: 17,
      question: "Qui est le défendeur, la défenderesse ?",
      answer:
        "Celui qui est attrait dans la procédure, Par exemple, en matière de bail d’habitation, le locataire est le défendeur lorsqu’il est poursuivi par le propriétaire pour non-paiement des loyers.  ",
    },
    {
      vocId: 18,
      question: "Qui est le demandeur, la demanderesse ?",
      answer:
        "C'est celui qui engage la procédure,  Par exemple, en matière de bail d’habitation, le propriétaire est le demandeur à l’instance lorsqu’il saisit le Tribunal pour voir ordonner l’expulsion du locataire qui ne paye pas les loyers",
    },
  ];

  const [dataQue, setDataQue] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [dataVoc, setDataVoc] = useState([]);
  const [filteredDataVoc, setFilteredDataVoc] = useState([]);

  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    setDataQue(procedureData);
  }, []);

  useEffect(() => {
    function getFilteredArray(arr1, _searchText) {
      if (_searchText.length === 0) {
        return arr1;
      }
      return FuseUtils.filterArrayByString(arr1, _searchText);
    }
    setFilteredData(getFilteredArray(dataQue, searchText));
  }, [dataQue, searchText]);

  // ************************************************
  useEffect(() => {
    setDataVoc(vocabularyData);
  }, []);

  useEffect(() => {
    function getFilteredArray(arr2, _searchText) {
      if (_searchText.length === 0) {
        return arr2;
      }
      return FuseUtils.filterArrayByString(arr2, _searchText);
    }
    setFilteredDataVoc(getFilteredArray(dataQue, searchText));
  }, [dataVoc, searchText]);

  const toggleAccordion = (panel) => (event, _expanded) => {
    setExpanded(_expanded ? panel : false);
  };

  function handleSearch(event) {
    setSearchText(event.target.value);
  }

  return (
    <Root className="w-full flex flex-col flex-auto">
      <div className="FaqsPage-header flex flex-col shrink-0 items-center justify-center text-center p-16 sm:p-24 h-auto sm:h-360">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
        >
          <Typography
            color="inherit"
            className="text-32 sm:text-36 tracking-tight"
          >
            Foire aux questions
          </Typography>
        </motion.div>

        <Paper className="flex shrink-0 items-center h-1/2 w-full w-1/4 rounded-32 shadow">
          <Icon color="action" className="mx-16">
            search
          </Icon>
          <Input
            placeholder="Recherche"
            type="text"
            disableUnderline
            fullWidth
            inputProps={{
              "aria-label": "Search",
            }}
            value={searchText}
            onChange={handleSearch}
          />
        </Paper>
      </div>

      <div className="flex flex-col flex-1 shrink-0 max-w-xl w-full mx-auto px-16 sm:px-24 py-24 sm:py-32">
        {filteredData.length === 0 && (
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
                staggerChildren: 0.05,
              },
            },
          };

          const item = {
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          };

          return (
            filteredData.length &&
            filteredDataVoc.length > 0 && (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="shadow rounded-20"
              >
                <Typography
                  style={{ backgroundColor: "#ffffff" }}
                  variant="subtitle1"
                  color="#1BD7EF"
                  className="opacity-75 mt-0 pl-24 text-24 sm:mt-16 mx-auto max-w-912 font-semibold"
                >
                  Questions de Procedure
                </Typography>
                {filteredData.map((faq) => (
                  <Accordion
                    component={motion.div}
                    variants={item}
                    key={faq.id}
                    classes={{
                      root: "FaqsPage-panel shadow-0",
                    }}
                    expanded={expanded === faq.id}
                    onChange={toggleAccordion(faq.id)}
                  >
                    <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                      <div className="flex items-center pl-16">
                        <Typography className="px-12 font-medium">
                          {faq.question}
                        </Typography>
                      </div>
                    </AccordionSummary>

                    <AccordionDetails>
                      <Typography
                        color="#7b7b7b"
                        className="text-14 px-32 pb-8 -mt-8"
                      >
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
                <Typography
                  style={{ backgroundColor: "#ffffff" }}
                  color="#1BD7EF"
                  className="opacity-75 text-24 mt-0 pl-24 sm:mt-16 mx-auto max-w-912 font-semibold"
                >
                  Questions de Vocabulaire
                </Typography>
                {vocabularyData.map((faq) => (
                  <Accordion
                    component={motion.div}
                    variants={item}
                    key={faq.vocId}
                    classes={{
                      root: "FaqsPage-panel shadow-0",
                    }}
                    expanded={expanded === faq.vocId}
                    onChange={toggleAccordion(faq.vocId)}
                  >
                    <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                      <div className="flex items-center pl-16">
                        <Typography className="px-12 font-medium">
                          {faq.question}
                        </Typography>
                      </div>
                    </AccordionSummary>

                    <AccordionDetails>
                      <Typography
                        color="#7b7b7b"
                        className="text-14 px-32 pb-8 -mt-8"
                      >
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}{" "}
              </motion.div>
            )
          );
        }, [filteredData, expanded])}
      </div>
    </Root>
  );
}

export default FaqsPage;
