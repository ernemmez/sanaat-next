import EncyclopediaPage from "../components/EncyclopediaPage";
import EncyclopediaList from "../components/EncyclopediaPage/EncyclopediaList";
import Hero from "../components/Hero";
import HightlightedEvents from "../components/HightlightedEvents";
import HightlightedTopics from "../components/HightlightedTopics";
import Jumbotron from "../components/Jumbotron";
import MuseumList from "../components/MuseumList";
import MuseumPage from "../components/MuseumPage";
import TopicPage from "../components/TopicPage";
import BlogList from "../components/BlogList";
import AboutPage from "../components/AboutPage";
import Calendar from "../components/Calendar";
import Contact from "../components/Contact";

const COMPONENTS_MAP:{
  [key: string]: React.ComponentType<any>;
} = {
  "sections.hero": Hero,
  "sections.jumbotron": Jumbotron,
  "sections.hightlighted-topics": HightlightedTopics,
  "sections.hightlighted-events": HightlightedEvents,
  "sections.museums": MuseumList,
  "sections.encyclopedia-list": EncyclopediaList,
  "sections.blog-list": BlogList,
  "sections.calendar": Calendar,
  "layout.muze-page": MuseumPage,
  "layout.topic-page": TopicPage,
  "layout.encyclopedia-page": EncyclopediaPage,
  "layout.about-page": AboutPage,
  "layout.contact-page": Contact
};

export const sectionRenderer = (section: { __component: string; }, index: number) => {
  const Component = COMPONENTS_MAP[section.__component];

  if (!Component) {
    return null;
  }

  return <Component key={index} data={section} />;
};