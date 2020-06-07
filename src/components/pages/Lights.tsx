import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import { Link } from 'react-router-dom';
import * as React from 'react';
import LightSwitch, { ILightSwitch } from '../content/LightSwitch';

interface ILightsOwnProps {}

export type ILightsProps = ILightsOwnProps & Partial<IRootStore>;

function Lights({ store = storeDefaultProps.store }: ILightsProps) {
  const { appStore } = store;
  const { lights = [] } = appStore;
  const groups: { [key: string]: ILightSwitch[] } = {};

  for (const light of lights) {
    const group = light.group ? light.group : 'noGroup';
    if (groups.hasOwnProperty(group)) {
      groups[group].push(light);
    } else {
      groups[group] = [light];
    }
  }

  const groupsArr = [];
  for (const groupKey in groups) {
    if (groups.hasOwnProperty(groupKey)) {
      const lightsArr: ILightSwitch[] = groups[groupKey];
      groupsArr.push(lightsArr);
    }
  }

  const cardRows = [];
  let temp = [];
  let count = 0;
  for (const group of groupsArr) {
    temp.push(group);
    count += 1;
    if (count % 3 === 0 || count === groupsArr.length) {
      cardRows.push(temp);
      temp = [];
    }
  }

  return (
    <div className="container-fluid">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/lights">Lights</Link>
        </li>
        <li className="breadcrumb-item active">Control house lighting</li>
      </ol>
      <article>
        {cardRows.map((row, i) => (
          <div className="row row-eq-height" key={`lights-row-${i}`}>
            {row.map((group) => {
              const firstLight = group[0];
              return (
                <div className="col-md-4 mb-3" key={`lights-column-${firstLight.group}`}>
                  <div className="card h-100 zIndex1">
                    <div className="card-header">
                      <h5 className="card-title mb-0">
                        {firstLight.groupLabel ? firstLight.groupLabel : 'Lights'}
                      </h5>
                    </div>
                    <div className="card-body">
                      <fieldset>
                        {group.map((light) => (
                          <LightSwitch key={`light-${light.id}`} storeKey="lights" {...light} />
                        ))}
                      </fieldset>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </article>
    </div>
  );
}

export default inject('store')(observer(Lights));
