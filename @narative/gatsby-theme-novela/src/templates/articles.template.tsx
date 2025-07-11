import React from "react";
import styled from "@emotion/styled";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import Paginator from "@components/Navigation/Navigation.Paginator";

import { Link } from "gatsby";
import { css } from "@emotion/core";
import Headings from '@components/Headings';
import mediaqueries from '@styles/media';

import ArticlesHero from "../sections/articles/Articles.Hero";
import ArticlesList from "../sections/articles/Articles.List";

import { Template } from "@types";

const ArticlesPage: Template = ({ location, pageContext }) => {
  const articles = pageContext.group;
  const authors = pageContext.additionalContext.authors;
  const categories = pageContext.additionalContext.categories;
  const categoriesObject = pageContext.additionalContext.categoriesObject;
  const maxArticles = 2;

  return (
    <Layout>
      <SEO pathname={location.pathname} />
      <ArticlesHero authors={authors} />
        <Section narrow>
          {/* {
            categories.map((category, index) => {
              const articles = categoriesObject[category];

              return (
                <div key={category}>
                  <Category> {category} </Category>
                  <ArticlesList articles={articles.slice(0, maxArticles)} />
                  { articles.length > maxArticles ? <PageButton to={'/category/'+ category}>more</PageButton> : null }
                  { index < categories.length - 1 ? <LineBreak /> : null }
                </div>
              )
            })

          } */}
          {
            <ArticlesList articles={articles} />
          }
          <ArticlesPaginator show={pageContext.pageCount > 1}>
            <Paginator {...pageContext} />
          </ArticlesPaginator>
        </Section>
      <ArticlesGradient />
    </Layout>
  );
};

export default ArticlesPage;

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
    padding: 30px 20px 0;
    margin-top: 30px;
    margin-bottom: 15px;
    -webkit-line-clamp: 3;
  `}
`;

const ArticlesGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 590px;
  z-index: 0;
  pointer-events: none;
  background: ${p => p.theme.colors.gradient};
  transition: ${p => p.theme.colorModeTransition};
`;

const ArticlesPaginator = styled.div<{ show: boolean }>`
  ${p => p.show && `margin-top: 95px;`}
`;

const paginationItemMixin = p => css`
  line-height: 1;
  color: ${p.theme.colors.primary};
  padding: 0;
  width: 6.8rem;
  height: 6.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-variant-numeric: tabular-nums;
`;


const PageButton = styled(Link)`
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  text-align: center;
  margin: 0 auto;
  color: ${p => p.theme.colors.primary};
  ${paginationItemMixin}

  &:hover,
  &:focus {
    opacity: 1;
    text-decoration: underline;
  }
`;

const LineBreak = styled.h3`
  position: relative;
  opacity: 0.2;
  margin-bottom: 100px;
  font-weight: 400;
  margin: 0 auto;
  width: 80%;
  color: ${p => p.theme.colors.primary};

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  &::after {
    content: '';
    position: absolute;
    background: ${p => p.theme.colors.grey};
    width: 100%;
    height: 1px;
    right: 0;
    top: 11px;
  }
`;