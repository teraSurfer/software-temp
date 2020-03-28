import React, { Fragment } from 'react';

interface IFooterProps {}

const AppFooter = function(props: IFooterProps) {
  return (
    <Fragment>
      <div>
        Icons made by{' '}
        <a
          href='https://www.flaticon.com/authors/vectors-market'
          title='Vectors Market'
        >
          Vectors Market
        </a>
        from{' '}
        <a href='https://www.flaticon.com/' title='Flaticon'>
          www.flaticon.com
        </a>
      </div>

      <div>
        Icons made by{' '}
        <a href='https://www.flaticon.com/authors/eucalyp' title='Eucalyp'>
          Eucalyp
        </a>{' '}
        from{' '}
        <a href='https://www.flaticon.com/' title='Flaticon'>
          www.flaticon.com
        </a>
      </div>
      <div>
        Icons made by{' '}
        <a href='https://www.flaticon.com/authors/ddara' title='dDara'>
          dDara
        </a>{' '}
        from{' '}
        <a href='https://www.flaticon.com/' title='Flaticon'>
          www.flaticon.com
        </a>
      </div>
      <div>
        Icons made by{' '}
        <a href='https://www.flaticon.com/authors/nhor-phai' title='Nhor Phai'>
          Nhor Phai
        </a>{' '}
        from{' '}
        <a href='https://www.flaticon.com/' title='Flaticon'>
          www.flaticon.com
        </a>
      </div>
    </Fragment>
  );
};

export default AppFooter;
