import React, {useState} from 'react';
import {TextInput} from '../input';

import {ComponentLoadable} from '../loadable';
import Label from '../text/label';

import './style.less';

const DEFAULT_NOT_FOUND_TEXT = 'Совпадений не найдено';

export default ({matchesProvider, onMatchClick, notFoundText = DEFAULT_NOT_FOUND_TEXT, MatchComponent = DefaultMatchComponent}) => {
    const [query, onQueryChange] = useState(null);
    const [matches, onMatchesChange] = useState([]);
    const [loading, toggleLoading] = useState(false);

    const onInputTextChange = (_, text) => {
        onQueryChange(text);
        if (('string' === typeof text) && text.length) {
            toggleLoading(true);
            matchesProvider(text)
                .then(onMatchesChange)
                .finally(() => toggleLoading(false));
        } else {
            onMatchesChange([]);
        }
    };

    const renderMatches = () => {
        if (loading) {
            return (
                <DefaultMatchComponent className='ui__label--loading'>
                    <ComponentLoadable loading={loading}/>
                </DefaultMatchComponent>
            );
        }
        return matches.length
            ? matches.map((v) => <MatchComponent onClick={() => onMatchClick(v)} {...v} />)
            : <DefaultMatchComponent className='ui__label--not-found' text={notFoundText}/>;
    };

    return (
        <div className='ui__search'>
            <div className='ui__search-input'>
                <TextInput value={query} onChange={onInputTextChange}/>
            </div>
            {query && <div className='ui__search-matches'>{renderMatches()}</div>}
        </div>
    );
};

const DefaultMatchComponent = ({text, children, ...props}) => (
    <Label {...props}>{text || children}</Label>
);
