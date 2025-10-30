import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(data => {
        setAllPeople(data);
        setPeople(data);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filteredPeople = [...allPeople];

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query) {
      filteredPeople = filteredPeople.filter(
        person =>
          person.name.includes(query) ||
          person.motherName?.includes(query) ||
          person.fatherName?.includes(query),
      );
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person =>
        centuries.includes(`${Math.floor((person.born - 1) / 100) + 1}`),
      );
    }

    if (sort === 'name') {
      filteredPeople = filteredPeople.sort((person1, person2) =>
        person1.name.localeCompare(person2.name),
      );
    }

    if (sort === 'name' && order) {
      filteredPeople = filteredPeople.sort((person1, person2) =>
        person2.name.localeCompare(person1.name),
      );
    }

    if (sort === 'sex') {
      filteredPeople = filteredPeople.sort((person1, person2) =>
        person1.sex.localeCompare(person2.sex),
      );
    }

    if (sort === 'sex' && order) {
      filteredPeople = filteredPeople.sort((person1, person2) =>
        person2.sex.localeCompare(person1.sex),
      );
    }

    if (sort === 'born') {
      filteredPeople = filteredPeople.sort(
        (person1, person2) => person1.born - person2.born,
      );
    }

    if (sort === 'born' && order) {
      filteredPeople = filteredPeople.sort(
        (person1, person2) => person2.born - person1.born,
      );
    }

    if (sort === 'died') {
      filteredPeople = filteredPeople.sort(
        (person1, person2) => person1.died - person2.died,
      );
    }

    if (sort === 'died' && order) {
      filteredPeople = filteredPeople.sort(
        (person1, person2) => person2.died - person1.died,
      );
    }

    setPeople(filteredPeople);
  }, [sex, query, centuries, sort, order, allPeople]);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !errorMessage && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!loading && !errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !errorMessage && people.length > 0 && (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export const PeoplePage = () => {
//   return (
//     <>
//       <h1 className="title">People Page</h1>

//       <div className="block">
//         <div className="columns is-desktop is-flex-direction-row-reverse">
//           <div className="column is-7-tablet is-narrow-desktop">
//             <PeopleFilters />
//           </div>

//           <div className="column">
//             <div className="box table-container">
//               <Loader />

//               <p data-cy="peopleLoadingError">Something went wrong</p>

//               <p data-cy="noPeopleMessage">There are no people on the server</p>

//               <p>There are no people matching the current search criteria</p>

//               <PeopleTable />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
