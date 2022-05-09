import { NetworkStatus, useQuery } from '@apollo/client';
import { FC, useContext, useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { useNavigate, useParams } from 'react-router';
import GET_USER_EVENTS from '../../../gql/getUserEvents';
import { IEvent } from '../../../interfaces/types';
import AuthContext from '../../../store/auth-context';
import Alert from '../../UI/Alert/Alert';
import Spinner from '../../UI/Spinner/Spinner';
import TitledCard from '../../UI/TitledCard/TitledCard';
import Pagination from '../../Pagination/Pagination';

const ITEMS_PER_PAGE = 10;

type EventsType = {
  totalCount: number;
  events: IEvent[];
};

const MyEvents: FC = () => {
  const { id } = useParams();
  const { SearchBar } = Search;

  const [searchText, setSearchText] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { data, loading, error, networkStatus } = useQuery<
    { getUserEvents: EventsType },
    {
      id: string;
      filter: { searchText: string; pageNumber: number; pageSize: number };
    }
  >(GET_USER_EVENTS, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    variables: {
      id: id ?? '',
      filter: { searchText, pageNumber, pageSize: ITEMS_PER_PAGE },
    },
  });

  const columns = [
    {
      dataField: 'title',
      text: 'Title',
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: 'start',
      text: 'Start',
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: 'end',
      text: 'End',
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: 'description',
      text: 'Description',
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: 'isPrivate',
      text: 'Private',
      sort: true,
    },
    {
      dataField: 'url',
      text: 'Link',
      sort: true,
    },
    {
      dataField: 'createdBy',
      text: 'Posted By',
      sort: true,
    },
    {
      dataField: 'createdAt',
      text: 'Posted Date',
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: 'updatedAt',
      text: 'Updated Date',
      sort: true,
    },
  ];

  const selectRow: any = {
    mode: 'checkbox',
    clickToSelect: true,
    onSelect: (row: any, isSelect: boolean, rowIndex: number, e: any) => {
      console.log(row);
    },
    onSelectAll: (isSelect: boolean, rows: any, e: any) => {
      console.log(rows);
    },
  };

  const setSearchTextHandler = (text: string) => {
    setPageNumber(1);
    setSearchText(text);
  };

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    !authCtx.auth && navigate('/');
  }, [authCtx, navigate]);

  if (error) {
    return (
      <Alert
        msg={error.message}
        type="danger"
        ariaLabel="Warning"
        fillType="#exclamation-triangle-fill"
      />
    );
  }

  const updatedEvents = data?.getUserEvents.events.map((event) => {
    const {
      id,
      title,
      start,
      end,
      isPrivate,
      description,
      url,
      createdBy,
      createdAt,
      updatedAt,
    } = event;

    return {
      id,
      title,
      description,
      start: new Date(start).toLocaleString(),
      end: new Date(end).toLocaleString(),
      createdBy: createdBy.username,
      isPrivate: isPrivate ? 'Yes' : 'No',
      url: url ? <a href={url}>Link</a> : '',
      createdAt: createdAt ? new Date(createdAt).toLocaleString() : '',
      updatedAt: updatedAt ? new Date(updatedAt).toLocaleString() : '',
    };
  });

  return (
    <>
      {loading || networkStatus === NetworkStatus.refetch ? (
        <Spinner />
      ) : (
        <TitledCard title="My Events">
          <ToolkitProvider
            bootstrap4
            keyField="id"
            data={updatedEvents ?? []}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <SearchBar
                  {...props.searchProps}
                  onSearch={setSearchTextHandler}
                  searchText={searchText}
                  delay={800}
                />
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  striped
                  hover
                  bordered={false}
                  selectRow={selectRow}
                  wrapperClasses="table-responsive"
                  rowStyle={{ overflowWrap: 'break-word' }}
                  filter={filterFactory()}
                />
              </div>
            )}
          </ToolkitProvider>
          <div className="float-end">
            <Pagination
              total={data?.getUserEvents.totalCount || 0}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={pageNumber}
              onPageChange={(page) => setPageNumber(page)}
            />
          </div>
        </TitledCard>
      )}
    </>
  );
};

export default MyEvents;
