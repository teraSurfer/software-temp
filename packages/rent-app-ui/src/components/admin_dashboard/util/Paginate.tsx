import React from 'react';
import { ButtonToolbar, ButtonGroup, Button } from 'reactstrap';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import * as _ from 'lodash';

type PaginateProps = {
  data: any;
  page: any;
  setPage: any;
  refetch: any;
};

const Paginate = ({ data, page, setPage, refetch }: PaginateProps) => {
  const findNext = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (data.length < 5) {
      swal({ icon: 'warning', text: 'Already on the last page.' });
      return;
    }
    setPage({ skip: page.skip + 5, take: page.take + 5 });
    refetch(page);
  };

  const findPrev = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (_.isEqual(page, { skip: 0, take: 5 })) {
      swal({ icon: 'warning', text: 'Already on the first page.' });
      return;
    }
    setPage({ skip: page.skip - 5, take: page.take - 5 });
    refetch(page);
  };

  return (
    <ButtonToolbar className='d-flex mt-2 justify-content-center'>
      <ButtonGroup>
        <Button outline onClick={findPrev} color='dark' size='sm'>
          <Fa icon={faChevronLeft} />
        </Button>
        <Button outline onClick={findNext} color='dark' size='sm'>
          <Fa icon={faChevronRight} />
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
};

export default Paginate;
