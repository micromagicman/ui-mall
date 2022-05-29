import { faXmark }         from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useFlag }         from '../../hooks';
import { pass }            from '../../util/function';

import { TextInput }         from '../input';
import { ComponentLoadable } from '../loadable';
import Label                 from '../text/label';

import './style.less';

const DEFAULT_NOT_FOUND_TEXT = 'Совпадений не найдено';

export default ({
                    matchesProvider,
                    onMatchClick = pass,
                    onMatchSelectionReset = pass,
                    notFoundText = DEFAULT_NOT_FOUND_TEXT,
                    MatchComponent = DefaultMatchComponent
                }) => {
    const [query, changeQuery] = useState(null);
    const [matches, matchesChange] = useState([]);
    const [loading, startLoading, stopLoading] = useFlag();
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
        matchesChange([]);
        if (('string' === typeof text) && text.length) {
            startLoading();
            matchesProvider(text)
                .then(matchesChange)
                .finally(stopLoading);
        }
    };

    const renderMatches = () => {
        if (loading()) {
            return (
                <DefaultMatchComponent className="ui__label--loading">
                    <ComponentLoadable loading={true}/>
                </DefaultMatchComponent>
            );
        }
        return matches.length
            ? matches.map((v, i) => (
                <MatchComponent key={i}
                                onClick={() => onMatchClickHandler(v)} {...v} />
            ))
            : <DefaultMatchComponent className="ui__label--not-found"
                                     text={notFoundText}/>;
    };

    return (
        <div className="ui__search">
            <div className="ui__search__input">
                <TextInput disabled={!!matchSelection} value={query}
                           onChange={onInputTextChange}/>
                {matchSelection && (
                    <SelectedMatch
                        onClick={onMatchSelectionResetHandler}
                        {...matchSelection} />
                )}
            </div>
            {query && <div className="ui__search__matches">{renderMatches()}</div>}
        </div>
    );
};

const DefaultMatchComponent = ({text, children, ...props}) => (
    <Label {...props}>{text || children}</Label>
);

const SelectedMatch = ({text, onClick}) => (
    <div className="ui__search__selection" onClick={onClick}>
        <Label>{text}</Label>
        <FontAwesomeIcon icon={faXmark}/>
    </div>
);