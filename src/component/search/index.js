import React, {useState} from 'react';
import {TextInput} from '../input';

import {ComponentLoadable} from '../loadable';
import Label from '../text/label';

import './style.less';

const DEFAULT_NOT_FOUND_TEXT = 'Совпадений не найдено';

const SelectedMatch = ({text, ...rest}) =>
    <div className='ui__search__selection' {...rest}>
        <Label>{text}</Label>
    </div>

export default ({
    matchesProvider,
    onMatchClick = () => {},
    onMatchSelectionReset = () => {},
    notFoundText = DEFAULT_NOT_FOUND_TEXT,
    MatchComponent = DefaultMatchComponent
}) => {
    const [query, changeQuery] = useState(null);
    const [matches, matchesChange] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [matchSelection, selectMatch] = useState(null);

    const onMatchSelectionResetHandler = () => {
        onMatchSelectionReset();
        selectMatch(null);
    };

    const onMatchClickHandler = (match) => {
        selectMatch(match);
        changeQuery('');
        onMatchClick(match);
    };

    const onInputTextChange = (_, text) => {
        changeQuery(text);
        if (('string' === typeof text) && text.length) {
            toggleLoading(true);
            matchesProvider(text)
                .then(matchesChange)
                .finally(() => toggleLoading(false));
        } else {
            matchesChange([]);
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
            ? matches.map((v, i) => <MatchComponent key={i} onClick={() => onMatchClickHandler(v)} {...v} />)
            : <DefaultMatchComponent className='ui__label--not-found' text={notFoundText}/>;
    };

    return (
        <div className='ui__search'>
            <div className='ui__search__input'>
                <TextInput disabled={!!matchSelection} value={query} onChange={onInputTextChange}/>
                {matchSelection && (
                    <SelectedMatch
                        onClick={onMatchSelectionResetHandler}
                        {...matchSelection} />
                )}
            </div>
            {query && <div className='ui__search__matches'>{renderMatches()}</div>}
        </div>
    );
};

const DefaultMatchComponent = ({text, children, ...props}) => (
    <Label {...props}>{text || children}</Label>
);
