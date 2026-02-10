import React, { useContext, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import { useColorMode } from 'theme-ui';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';

import mediaqueries from '@styles/media';
import { IArticle } from '@types';

import { GridLayoutContext } from './Articles.List.Context';

/**
 * Tiles
 * [LONG], [SHORT]
 * [SHORT], [LONG]
 * [SHORT], [LONG]
 *
 * or ------------
 *
 * Rows
 * [LONG]
 * [LONG]
 * [LONG]
 */

interface ArticlesListProps {
  articles: IArticle[];
  alwaysShowAllDetails?: boolean;
  layout?: 'tiles' | 'rows';
  forceImage?: boolean;
  enableLoadMore?: boolean;
}

interface ArticlesListItemProps {
  article: IArticle;
  narrow?: boolean;
  gridLayout: 'tiles' | 'rows';
  forceImage?: boolean;
}

const ArticlesList: React.FC<ArticlesListProps> = ({
  articles,
  alwaysShowAllDetails,
  layout,
  forceImage,
  enableLoadMore,
}) => {
  if (!articles) return null;

  const hasOnlyOneArticle = articles.length === 1;
  const { gridLayout = 'rows', hasSetGridLayout, getGridLayout } = useContext(
    GridLayoutContext,
  );
  const shouldForceImage = forceImage ?? true;
  const isLockedLayout = Boolean(layout);
  const resolvedLayout = layout || gridLayout;
  const [showAll, setShowAll] = useState(false);
  const loadMoreAnchorDate = '2014-04-28';
  const listId = 'Articles__List';

  const matchesAnchorDate = (article: IArticle) => {
    const rawDate = `${article.dateForSEO || article.date || ''}`;
    return rawDate.slice(0, 10) === loadMoreAnchorDate;
  };

  const canShowLoadMore = useMemo(() => {
    if (!enableLoadMore) return false;
    return articles.some(matchesAnchorDate);
  }, [articles, enableLoadMore]);

  const visibleArticles = useMemo(() => {
    if (!canShowLoadMore || showAll) return articles;

    const anchorIndex = articles.findIndex(matchesAnchorDate);

    if (anchorIndex === -1) return articles;
    return articles.slice(0, anchorIndex + 1);
  }, [articles, canShowLoadMore, showAll]);

  useEffect(() => {
    if (isLockedLayout) return;
    getGridLayout();
  }, [getGridLayout, isLockedLayout]);

  const renderArticlePairs = (list: IArticle[]) => {
    /**
     * We're taking the flat array of articles [{}, {}, {}...]
     * and turning it into an array of pairs of articles [[{}, {}], [{}, {}], [{}, {}]...]
     * This makes it simpler to create the grid we want
     */
    const articlePairs = list.reduce((result, value, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, [] as IArticle[][]);

    return articlePairs.map((ap, index) => {
      const isEven = index % 2 !== 0;
      const isOdd = index % 2 !== 1;

      return (
        <List
          key={index}
          gridLayout={resolvedLayout}
          hasOnlyOneArticle={hasOnlyOneArticle}
          reverse={isEven}
        >
          <ListItem
            article={ap[0]}
            narrow={isEven}
            gridLayout={resolvedLayout}
            forceImage={shouldForceImage}
          />
          <ListItem
            article={ap[1]}
            narrow={isOdd}
            gridLayout={resolvedLayout}
            forceImage={shouldForceImage}
          />
        </List>
      );
    });
  };

  return (
    <ArticlesListContainer
      id={listId}
      style={{ opacity: isLockedLayout || hasSetGridLayout ? 1 : 0 }}
      alwaysShowAllDetails={alwaysShowAllDetails}
    >
      {renderArticlePairs(visibleArticles)}
      {canShowLoadMore && !showAll && (
        <LoadMoreContainer>
          <LoadMoreButton
            type="button"
            onClick={() => setShowAll(true)}
            aria-controls={listId}
            aria-expanded={showAll}
          >
            Show more
          </LoadMoreButton>
        </LoadMoreContainer>
      )}
    </ArticlesListContainer>
  );
};

export default ArticlesList;

const ListItem: React.FC<ArticlesListItemProps> = ({
  article,
  narrow,
  gridLayout,
  forceImage,
}) => {
  if (!article) return null;

  const [colorMode] = useColorMode();
  const isDark = colorMode === 'dark';
  const shouldHideImage = !forceImage && article.noImage;
  const hasOverflow = narrow && article.title.length > 35;
  const imageSource = narrow ? article.hero.narrow : article.hero.regular;
  const hasHeroImage =
    imageSource &&
    Object.keys(imageSource).length !== 0 &&
    imageSource.constructor === Object;

  return (
    <ArticleLink
      to={article.slug}
      data-a11y="false"
      $noImage={shouldHideImage}
      $isDark={isDark}
    >
      <Item gridLayout={gridLayout} noImage={shouldHideImage}>
        {!shouldHideImage && (
          <ImageContainer narrow={narrow || false} gridLayout={gridLayout}>
            {hasHeroImage ? <Image src={imageSource} alt={article.title} /> : <ImagePlaceholder />}
          </ImageContainer>
        )}
        <ContentWrapper>
          <Title dark hasOverflow={hasOverflow} gridLayout={gridLayout}>
            {article.title}
          </Title>
          <Excerpt
            narrow={narrow}
            hasOverflow={hasOverflow}
            gridLayout={gridLayout}
          >
            {article.excerpt}
          </Excerpt>
          <MetaData>
            {article.date}
            {/* {article.date} · {article.timeToRead} min read */}
          </MetaData>
        </ContentWrapper>
      </Item>
    </ArticleLink>
  );
};

const wide = '1fr';
const narrow = '457px';

const limitToThreeLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;

  ${mediaqueries.phablet`
    -webkit-line-clamp: 3;
  `}
`;

const showDetails = css`
  p {
    display: -webkit-box;
  }

  h2 {
    margin-bottom: 10px;
  }
`;

const ArticlesListContainer = styled.div<{ alwaysShowAllDetails?: boolean }>`
  transition: opacity 0.25s;
  ${p => p.alwaysShowAllDetails && showDetails}
`;

const LoadMoreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 80px 0 110px;

  ${mediaqueries.tablet`
    margin: 60px 0 80px;
  `}
`;

const LoadMoreButton = styled.button`
  font-weight: 700;
  font-size: 18px;
  line-height: 1;
  padding: 1.2rem 3.2rem;
  border-radius: 999px;
  border: 1px solid ${p => p.theme.colors.primary};
  background: ${p => p.theme.colors.background};
  color: ${p => p.theme.colors.primary};
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover,
  &:focus {
    background: ${p => p.theme.colors.primary};
    border-color: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.background};
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px ${p => p.theme.colors.accent};
    outline: none;
  }
`;

const listTile = p => css`
  position: relative;
  display: grid;
  grid-template-columns: ${p.reverse
    ? `${narrow} ${wide}`
    : `${wide} ${narrow}`};
  grid-template-rows: 2;
  column-gap: 30px;

  &:not(:last-child) {
    margin-bottom: 75px;
  }

  ${mediaqueries.desktop_medium`
    grid-template-columns: 1fr 1fr;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    
    &:not(:last-child) {
      margin-bottom: 0;
    }
  `}
`;

const listItemRow = p => css`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 488px;
  grid-column-gap: 96px;
  grid-template-rows: 1;
  align-items: center;
  position: relative;
  margin-top: 25px;
  margin-bottom: 25px;
  background: ${p.theme.colors.card};

  ${mediaqueries.desktop`
    grid-column-gap: 24px;
    grid-template-columns: 1fr 380px;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
  `}

  @media (max-width: 540px) {
    background: ${p.theme.colors.card};
  }

  ${mediaqueries.phablet`
    box-shadow: none;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  `}
`;

const listItemTile = p => css`
  position: relative;

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  @media (max-width: 540px) {
    background: ${p.theme.colors.card};
  }

  ${mediaqueries.phablet`
    margin-bottom: 40px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  `}
`;

// If only 1 article, dont create 2 rows.
const listRow = () => css`
  display: flex;
  flex-wrap: wrap;
  gap: 0 164px;

  ${mediaqueries.desktop`
    gap: 0;
  `}
`;

const List = styled.div<{
  reverse: boolean;
  gridLayout: string;
  hasOnlyOneArticle: boolean;
}>`
  ${p => (p.gridLayout === 'tiles' ? listTile : listRow)}
`;

const Item = styled.div<{ gridLayout: string; noImage?: boolean }>`
  ${p => (p.gridLayout === 'rows' ? listItemRow : listItemTile)}
  border-radius: 10px;
  overflow: hidden;
  ${p => p.noImage && css`
    background: transparent !important;
    grid-template-columns: 1fr;
    box-shadow: none;
  `}
  transition: transform 0.3s var(--ease-out-quad),
    box-shadow 0.3s var(--ease-out-quad);
`;

const ImageContainer = styled.div<{ narrow: boolean; gridLayout: string }>`
  position: relative;
  height: ${p => (p.gridLayout === 'tiles' ? '280px' : '220px')};
  margin-bottom: ${p => (p.gridLayout === 'tiles' ? '30px' : 0)};
  transition: transform 0.3s var(--ease-out-quad),
    box-shadow 0.3s var(--ease-out-quad);

  & > div {
    height: 100%;
  }

  ${mediaqueries.tablet`
    height: 200px;
    margin-bottom: 35px;
  `}

  ${mediaqueries.phablet`
    overflow: hidden;
    margin-bottom: 0;
    box-shadow: none;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  `}
`;

const Title = styled(Headings.h2)`
  font-size: 21px;
  font-family: ${p => p.theme.fonts.serif};
  margin-bottom: ${p =>
    p.hasOverflow && p.gridLayout === 'tiles' ? '35px' : '10px'};
  transition: color 0.3s ease-in-out;
  ${limitToThreeLines};

  ${mediaqueries.desktop`
    margin-bottom: 15px;
  `}

  ${mediaqueries.tablet`
    font-size: 24px;  
  `}

  ${mediaqueries.phablet`
    font-size: 22px;  
    padding: 30px 20px 0;
    margin-bottom: 10px;
    -webkit-line-clamp: 3;
  `}
`;

const Excerpt = styled.p<{
  hasOverflow: boolean;
  narrow: boolean;
  gridLayout: string;
}>`
  ${limitToThreeLines};
  font-size: 16px;
  margin-bottom: 10px;
  color: ${p => p.theme.colors.grey};
  display: ${p => (p.hasOverflow && p.gridLayout === 'tiles' ? 'none' : 'box')};
  max-width: ${p => (p.narrow ? '415px' : '515px')};
  min-height: 3.6em;

  ${mediaqueries.desktop`
    display: -webkit-box;
  `}

  ${mediaqueries.phablet`
    margin-bottom: 15px;
  `}

  ${mediaqueries.phablet`
    max-width: 100%;
    padding:  0 20px;
    margin-bottom: 20px;
    -webkit-line-clamp: 3;
  `}
`;

const MetaData = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${p => p.theme.colors.grey};

  ${mediaqueries.phablet`
    max-width: 100%;
    padding:  0 20px 30px;
  `}
`;

const ContentWrapper = styled.div`
  padding: 20px;
`;

const ArticleLink = styled(Link)<{ $noImage?: boolean; $isDark: boolean }>`
  position: relative;
  display: block;
  width: ${p => (p.$noImage ? '488px' : '100%')};
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  z-index: 1;
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  ${p => p.$noImage && mediaqueries.desktop`
    width: 100%;
  `}

  &:hover ${Item}, &:focus ${Item} {
    transform: translateY(-2px);
    box-shadow: ${p =>
      p.$isDark
        ? '0 26px 60px -24px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.12)'
        : '0 30px 80px -50px rgba(0, 0, 0, 0.27), 0 30px 50px -30px rgba(0, 0, 0, 0.3)'};
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -1.5%;
    top: -2%;
    width: 103%;
    height: 104%;
    border: 3px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.phablet`
    &:hover ${ImageContainer} {
      transform: none;
      box-shadow: initial;
    }

    &:active {
      transform: scale(0.97) translateY(3px);
    }
  `}
`;
