import { Link, NavLink, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSex = searchParams.get('sex') || '';
  const currentQuery = searchParams.get('query') || '';
  const currentCenturies = searchParams.getAll('centuries') || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value === '') {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  };

  const handleSexChange = (string: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sex', string);

    return `?${params.toString()}`;
  };

  const deleteSex = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');

    return `?${params.toString()}`;
  };

  const handleCenturiesChange = (str: string) => {
    const params = new URLSearchParams(searchParams);

    const newCenturies = currentCenturies.includes(str)
      ? currentCenturies.filter(century => century !== str)
      : [...currentCenturies, str];

    params.delete('centuries');

    newCenturies.forEach(century => params.append('centuries', century));

    return `?${params.toString()}`;
  };

  const deleteCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    return `?${params.toString()}`;
  };

  const deleteAllFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    params.delete('query');
    params.delete('centuries');

    return `?${params.toString()}`;
  };

  const isActiveCentury = (str: string) => {
    return searchParams.getAll('centuries').includes(str);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link className={currentSex === '' ? 'is-active' : ''} to={deleteSex()}>
          All
        </Link>
        <Link
          className={currentSex === 'm' ? 'is-active' : ''}
          to={handleSexChange('m')}
        >
          Male
        </Link>
        <Link
          className={currentSex === 'f' ? 'is-active' : ''}
          to={handleSexChange('f')}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={currentQuery}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <NavLink
              data-cy="century"
              className={
                isActiveCentury('16') ? 'button mr-1 is-active' : 'button mr-1'
              }
              to={handleCenturiesChange('16')}
            >
              16
            </NavLink>

            <NavLink
              data-cy="century"
              className={
                isActiveCentury('16') ? 'button mr-1 is-active' : 'button mr-1'
              }
              to={handleCenturiesChange('17')}
            >
              17
            </NavLink>

            <NavLink
              data-cy="century"
              className={
                isActiveCentury('16') ? 'button mr-1 is-active' : 'button mr-1'
              }
              to={handleCenturiesChange('18')}
            >
              18
            </NavLink>

            <NavLink
              data-cy="century"
              className={
                isActiveCentury('19') ? 'button mr-1 is-active' : 'button mr-1'
              }
              to={handleCenturiesChange('16')}
            >
              19
            </NavLink>

            <NavLink
              data-cy="century"
              className={
                isActiveCentury('16') ? 'button mr-1 is-active' : 'button mr-1'
              }
              to={handleCenturiesChange('20')}
            >
              20
            </NavLink>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={deleteCenturies()}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={deleteAllFilters()}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
