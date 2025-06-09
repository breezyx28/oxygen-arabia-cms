import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import SubserviceTableRow from '../subservice-table-row';
import SubserviceTableHead from '../subservice-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import IframeModal from 'src/components/iframe/IframeModal';
import SubserviceModal from 'src/components/modals/forms/subservice';
import { useAllSubservicesQuery } from 'src/redux/endpoints/sub-services';

// ----------------------------------------------------------------------

export default function SubServicesPage() {
  const { data: subservices, isLoading, isFetching } = useAllSubservicesQuery();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = subservices?.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: subservices?.data ?? [],
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  // -----------------------------------------------------------------------

  const [modalOpen, setModalOpen] = useState(false);
  const iframeUrl = "https://oxygenarabia.com/#services"; // Replace with your desired URL

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

        <Stack direction="column" alignItems="start" justifyContent="space-between">
          <Typography variant="h4">Subservices</Typography>
          <Typography variant="caption" color="textSecondary" mt={2}>
            Subservices section, connect your subservices with related services for your customers.
          </Typography>
        </Stack>

        <Button variant="contained" onClick={handleOpenModal} color="error" startIcon={<Iconify icon="fluent:live-24-filled" />}>
          Live
        </Button>
        <IframeModal
          open={modalOpen}
          onClose={handleCloseModal}
          src={iframeUrl}
          title="Sub-Services Iframe"
        />
        <SubserviceModal />
      </Stack>

      <Card>
        {/* <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        /> */}

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <SubserviceTableHead
                order={order}
                orderBy={orderBy}
                rowCount={subservices?.length ?? []}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'title', label: 'Title' },
                  { id: 'subtitle', label: 'Subtitle' },
                  { id: 'service', label: 'Related Service' },
                  { id: 'description', label: 'Description' },
                  { id: 'card_description', label: 'Card Description' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <SubserviceTableRow
                      key={row.id}
                      id={row.id}
                      title={row.title}
                      subtitle={row.subtitle}
                      image={row.image}
                      service={row.service}
                      description={row.description}
                      card_description={row.card_description}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, subservices?.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={subservices?.length ?? []}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
