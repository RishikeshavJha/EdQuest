import { useState } from 'react';
import styled from 'styled-components';
import { css } from '@emotion/react';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import Contact from './components/Contact';

const Page = styled.div`
  min-height: 100vh;
  background: #f7f8fb;
  color: #182033;
`;

const Hero = styled.section`
  width: min(1080px, calc(100% - 36px));
  margin: 0 auto;
  min-height: 620px;
  display: grid;
  grid-template-columns: 1.25fr .75fr;
  gap: 50px;
  align-items: center;
  padding: 80px 0;
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    min-height: auto;
    padding: 55px 0;
  }
`;

const HeroCopy = styled.div`
  max-width: 680px;
`;

const Intro = styled.p`
  margin: 0 0 14px;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: #64748b;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(42px, 8vw, 76px);
  line-height: .98;
  letter-spacing: -.055em;
`;

const Accent = styled.span`
  color: #5263ff;
`;

const HeroText = styled.p`
  max-width: 620px;
  margin: 24px 0 0;
  color: #64748b;
  font-size: 18px;
  line-height: 1.7;
`;

const CTA = styled.a`
  display: inline-flex;
  margin-top: 28px;
  padding: 13px 18px;
  border-radius: 12px;
  background: #182033;
  color: white;
  text-decoration: none;
  font-weight: 750;
  transition: transform .2s ease, opacity .2s ease;
  &:hover { transform: translateY(-2px); opacity: .92; }
`;

const Portrait = styled.div`
  aspect-ratio: 1;
  border-radius: 32px;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, #dfe4ff, #f0f2f8);
  border: 1px solid #e2e6ef;
  font-size: 100px;
  box-shadow: 0 25px 60px rgba(28, 39, 75, .08);
  @media (max-width: 760px) {
    width: min(320px, 100%);
    margin: 0 auto;
  }
`;

const Section = styled.section`
  width: min(1080px, calc(100% - 36px));
  margin: 0 auto;
  padding: 85px 0;
`;

const SectionHeading = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;
  @media (max-width: 620px) { display: block; }
`;

const H2 = styled.h2`
  margin: 0;
  font-size: clamp(30px, 5vw, 46px);
  letter-spacing: -.04em;
`;

const Muted = styled.p`
  margin: 8px 0 0;
  color: #64748b;
  line-height: 1.6;
`;

const Projects = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  @media (max-width: 850px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const SkillGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const skillStyle = css`
  padding: 10px 13px;
  border-radius: 999px;
  background: white;
  border: 1px solid #e2e6ef;
  color: #475569;
  font-size: 14px;
  font-weight: 650;
`;

const skills = ['React', 'JavaScript', 'HTML5', 'CSS3', 'Flexbox', 'CSS Grid', 'Styled Components', 'Emotion', 'Responsive Design'];

const projectData = [
  { title: 'TaskFlow', type: 'React App', description: 'A clean task manager using reusable components, props and state.', tag: 'React' },
  { title: 'Dashboard', type: 'UI System', description: 'A responsive dashboard concept built with CSS Grid and reusable cards.', tag: 'CSS Grid' },
  { title: 'Landing Page', type: 'Responsive Web', description: 'A mobile-first landing page demonstrating layout, typography and media queries.', tag: 'Flexbox' }
];

export default function App() {
  const [theme, setTheme] = useState(false);

  // Inline style demonstration: theme button styling is created directly in JSX.
  const themeButtonStyle = {
    border: '1px solid #dfe3ec',
    background: theme ? '#182033' : 'white',
    color: theme ? 'white' : '#182033',
    borderRadius: '10px',
    padding: '9px 12px',
    fontWeight: 700
  };

  return (
    <Page className={theme ? 'dark-mode' : ''}>
      <Header onThemeToggle={() => setTheme(value => !value)} themeButtonStyle={themeButtonStyle} />

      <Hero id="home">
        <HeroCopy>
          <Intro>Frontend developer • React learner</Intro>
          <HeroTitle>Building thoughtful interfaces with <Accent>React.</Accent></HeroTitle>
          <HeroText>
            This portfolio demonstrates practical React styling: inline styles,
            Styled Components, Emotion CSS-in-JS, Flexbox, CSS Grid and media queries.
          </HeroText>
          <CTA href="#projects">View my work ↓</CTA>
        </HeroCopy>
        <Portrait aria-label="Abstract profile illustration">✦</Portrait>
      </Hero>

      <Section id="about">
        <SectionHeading>
          <div>
            <H2>About the approach</H2>
            <Muted>Good UI is clear, accessible and responsive.</Muted>
          </div>
        </SectionHeading>
        <div className="about-layout">
          <p>
            I focus on interfaces that remain easy to use across screen sizes.
            Component-level styling keeps related visual rules close to the UI,
            while global CSS handles shared foundations and responsive behavior.
          </p>
          <p>
            In this assignment, the portfolio intentionally combines different
            styling techniques so their roles can be compared in one application.
          </p>
        </div>
      </Section>

      <Section id="projects">
        <SectionHeading>
          <div>
            <H2>Selected work</H2>
            <Muted>Reusable cards rendered from data.</Muted>
          </div>
        </SectionHeading>
        <Projects>
          {projectData.map(project => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </Projects>
      </Section>

      <Section id="skills">
        <SectionHeading>
          <div>
            <H2>Toolkit</H2>
            <Muted>Technologies and styling concepts used here.</Muted>
          </div>
        </SectionHeading>
        <SkillGrid>
          {skills.map(skill => (
            <span key={skill} css={skillStyle}>{skill}</span>
          ))}
        </SkillGrid>
      </Section>

      <Contact />
      <footer>React Styling Portfolio • Built for the UI/UX & Responsive Design assignment</footer>
    </Page>
  );
}