import { Fragment, useState } from 'react';
import SignsContext from '../contexts/SignsContext';
import GetSigns from '../components/graphql/GetSigns';
import SignsTable from '../components/SignsTable';
import PaginationUI from '../components/PaginationUI';

const Signs = ({ history, match }: any) => {
  const {
    params: {
      page: currentPage = 1,
      size: currentSize = 15,
    }
  } = match;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [signs, setSigns] = useState([]);
  const [pagination, setPagination] = useState({
    page: Number(currentPage),
    size: Number(currentSize),
    total: 0,
  });
  const [page, setPage] = useState(Number(currentPage));
  const [size, setSize] = useState(Number(currentSize));
  const [fetchMore, setFetchMore] = useState([]);

  const signsContextValues = {
    loading,
    setLoading,
    error,
    setError,
    signs: (signs as any),
    setSigns,
    pagination,
    setPagination,
    page,
    setPage,
    size,
    setSize,
    fetchMore: (fetchMore as any),
    setFetchMore,
  }

  return (
    <SignsContext.Provider value={signsContextValues}>
      <SignsContext.Consumer>
        {() => (
          <Fragment>
            <h1>Signs</h1>
            <PaginationUI history={history} />
            <GetSigns />
            <SignsTable history={history} />
          </Fragment>
        )}
      </SignsContext.Consumer>
    </SignsContext.Provider>
  )
}

export default Signs;
