import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import classes from "../../../../../../shared/lib/tail/classes";
import { removeLeadingNegativeSign } from '../../../../../../shared/lib/tail/utils/functions';

const isSelected = (data, attr, classes) => {
    if (!_.isNull(data) && !_.isUndefined(data[attr])) {
        let { attribute, negative } = removeLeadingNegativeSign(data[attr]);
        return negative ? classes[attr].findIndex((value) => value === attribute) * -1 : classes[attr].findIndex((value) => value === attribute);
    } else {
        return -1;
    }
}
const Range = ({ title, data, attr, updateCss }) => {

    const [state, setState] = useState({
        min: -1,
        max: null,
        le: parseInt(classes[attr].length) - 1,
        selected: isSelected(data, attr, classes),
        values: classes[attr]
    });

    const updateStateAttributes = useCallback((updates) => {
        setState((prevState) => ({
            ...prevState,
            ...Object.keys(updates).reduce((acc, key) => {
                if (updates[key] && typeof updates[key] === 'object') {
                    acc[key] = {
                        ...prevState[key],
                        ...updates[key],
                    };
                } else {
                    acc[key] = updates[key];
                }
                return acc;
            }, {}),
        }));
    }, []);
    const handleChange = (e) => {

        let v = e.target.value * 1;
        updateStateAttributes({
            'selected': v
        });
        let prefix
        v < 0 ? prefix = '-' : prefix = ''
        if (v) {
            updateCss(prefix + state.values[Math.abs(v)], attr);
        } else {
            updateCss('', attr);
        }
    };

    return (
        <div className="flex flex-col clear-both">
            <input className="w-3/4" type="range" value={state.selected} onChange={handleChange} min={state.min} max={state.le} />
            <label className="capitalize">{title || attr}
                {state.selected < -1 && (state.selected === 0 ? '' : '[' + (state.selected - 1) + ']')}
            </label>
        </div>
    );
};
export default Range;
