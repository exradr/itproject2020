export {
  // action creators
  login,
  signup,
  logout,
  logoutAll,
  deleteUser,
  updateUser,
  // selectors
  selectAuthSlice,
  selectToken,
  selectUser,
  selectUsername,
  // reducer
  default as authReducer,
} from "./auth";

export {
  // action creators
  changeAccordion,
  changePortfolio,
  setLoading,
  setLoadingFinished,
  // selectors
  selectAccordion,
  selectCurrentPortfolio,
  selectLoadingStatus,
  selectLoadingText,
  selectLoading,
  // reducer
  default as uiReducer,
} from "./ui";

export {
  // action creators
  startEditing,
  finishEditing,
  fetchPortfolios,
  fetchPortfolio,
  fetchEntirePortfolio,
  fetchPortfolioPages,
  fetchPortfolioArtifacts,
  createPortfolio,
  changePortfolioBio,
  changePortfolioTheme,
  deletePortfolio,
  // selectors (custom)
  selectPortfolioPages,
  selectPortfolioPageNames,
  selectPortfolioPageIds,
  selectCurrentUserPortfolio,
  selectPortfolioIsEditing,
  selectPortfolioTheme,
  selectPortfolioBio,
  selectPortfoliosSlice,
  // Selectors
  selectPortfolioByUsername,
  selectPortfolioUsernames,
  selectPortfolioEntities,
  selectAllPortfolios,
  selectTotalPortfolios,
  // reducer
  default as portfoliosReducer,
} from "./portfolios";

export {
  // action creators
  fetchPage,
  fetchEntirePage,
  fetchPageArtifacts,
  createPage,
  changePageOptions,
  deletePage,
  renamePage,
  // selectors
  selectPagesSlice,
  selectPageById,
  selectPageIds,
  selectPageEntities,
  selectAllPages,
  selectTotalPages,
  selectPageArtifacts,
  selectPageName,
  selectPageType,
  selectPageArtifactIds,
  // reducer
  default as pagesReducer,
} from "./pages";

export {
  // action creators
  fetchArtifact,
  createArtifact,
  editArtifact,
  deleteArtifact,
  // selectors
  selectArtifactsSlice,
  selectArtifactById,
  selectArtifactIds,
  selectArtifactEntities,
  selectAllArtifacts,
  selectTotalArtifacts,
  // reducer
  default as artifactsReducer,
} from "./artifacts";

export {
  // action creators
  uploadMedia,
  getMedia,
  deleteMedia,
  // selectors
  selectMediaSlice,
  selectMediaById,
  selectMediaIds,
  selectMediaEntities,
  selectAllMedia,
  selectTotalMedia,
  // reducer
  default as mediaReducer,
} from "./media";
