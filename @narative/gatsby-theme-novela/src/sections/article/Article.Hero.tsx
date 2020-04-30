import React from 'react';
import styled from '@emotion/styled';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';
import ButtonArrow from '@components/Button/Button.Arrow';
import { useColorMode } from 'theme-ui';
import { navigate } from "gatsby";

import mediaqueries from '@styles/media';
import { IArticle, IAuthor } from '@types';

import ArticleAuthors from './Article.Authors';

interface ArticleHeroProps {
  article: IArticle;
  authors: IAuthor[];
}

const ArticleHero: React.FC<ArticleHeroProps> = ({ article, authors }) => {
  const [colorMode] = useColorMode();
  const hasCoAUthors = authors.length > 1;
  const showHeroTags =
    article.tags &&
    article.tags.length !== 0

  return (
    <Hero>
      <Header>
        <Category>{ article.category }</Category>
        <HeroHeading>{article.title}</HeroHeading>
        <HeroSubtitle>
          <ArticleMeta>{article.excerpt}</ArticleMeta>
        </HeroSubtitle>
        <HeroSubtitleContainer>
          <HeroSubtitle>
            <ArticleMeta><strong>Year</strong></ArticleMeta>
            <ArticleMeta>{article.date}</ArticleMeta>
          </HeroSubtitle>
          <HeroSubtitle id="ArticleTags__Hero">
            <ArticleMeta><strong>Technology</strong></ArticleMeta>
            <ArticleMeta>{ showHeroTags && article.tags.join(' / ') }</ArticleMeta>
          </HeroSubtitle>
        </HeroSubtitleContainer>
        { 
          article.links && article.links.map(
            (link, index) => 
              <ButtonArrow
                key={index}
                text={link.label}
                to={link.link}
                color={colorMode === "dark" ? "#fff" : "#000"}
                /> 
            )
        }
      </Header>
    </Hero>
  );
};

export default ArticleHero;

const Hero = styled.div`
  ${p => mediaqueries.phablet`
    &::before {
      content: "";
      width: 100%;
      height: 20px;
      background: ${p.theme.colors.primary};
      position: absolute;
      left: 0;
      top: 0;
      transition: ${p.theme.colorModeTransition};
    }

    &::after {
      content: "";
      width: 100%;
      height: 10px;
      background: ${p.theme.colors.background};
      position: absolute;
      left: 0;
      top: 10px;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      transition: ${p.theme.colorModeTransition};
    }
  `}
`;

const ArticleMeta = styled.div`
  margin-left: 0;
  line-height: 1.756;
`;

const Header = styled.header`
  position: relative;
  z-index: 10;
  margin:100px auto 0px;
  padding-left: 68px;
  max-width: 749px;

  ${mediaqueries.desktop`
    padding-left: 53px;
    max-width: calc(507px + 53px);
    margin: 100px auto 0px;
  `}

  ${mediaqueries.tablet`
    padding-left: 0;
    margin: 100px auto 0px;
    max-width: 480px;
  `}

  ${mediaqueries.phablet`
    margin: 170px auto 0px;
    padding: 0 40px;
  `}

  @media screen and (max-height: 700px) {
    margin: 100px auto;
  }
`;

const HeroHeading = styled(Headings.h1)`
  font-size: 48px;
  font-family: ${p => p.theme.fonts.serif};
  margin-bottom: 25px;
  font-weight: bold;
  line-height: 1.32;

  ${mediaqueries.tablet`
    margin-bottom: 20px;
    font-size: 36px;
  `}

  ${mediaqueries.phablet`
    font-size: 32px;
  `}
`;

const HeroSubtitle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  margin-bottom: 16px;
  color: ${p => p.theme.colors.grey};

  strong {
    color:  ${p => p.theme.colors.primary};
  }
`;

const HeroSubtitleContainer = styled.div`
    display: block;
    padding-top: 10px;
`;

const Category = styled(Headings.h2)`
  font-family: ${p => p.theme.fonts.serif};
  opacity: 0.2;
  margin-top: 120px;
  margin-bottom: 60px;
  transition: color 0.3s ease-in-out;

  ${mediaqueries.desktop`
    margin-top: 60px;
    margin-bottom: 30px;
  `}

  ${mediaqueries.tablet`
    font-size: 24px;  
  `}

  ${mediaqueries.phablet`
    font-size: 22px;  
    margin-top: 30px;
    margin-bottom: 15px;
    -webkit-line-clamp: 3;
  `}
`;