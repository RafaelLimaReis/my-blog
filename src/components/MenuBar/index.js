import React from 'react';

import * as S from './styled';
import Icons from './Icons';

const MenuBar = () => (
    <S.MenuBarWrapper>
        <S.MenuBarGroup>
            <S.MenuBarLink to="/" title="Voltar para Home">
                <S.MenuBarItem><Icons.Home /></S.MenuBarItem>
            </S.MenuBarLink>
            <S.MenuBarLink to="/search/" title="Pesquisar">
                <S.MenuBarItem><Icons.Search /></S.MenuBarItem>
            </S.MenuBarLink>
        </S.MenuBarGroup>
        <S.MenuBarGroup>
            <S.MenuBarItem title="Mudar o tema"><Icons.Light /></S.MenuBarItem>
            <S.MenuBarItem title="Mudar visualização"><Icons.Grid /></S.MenuBarItem>
            <S.MenuBarItem title="Ir para o topo"><Icons.Up /></S.MenuBarItem>
        </S.MenuBarGroup>
    </S.MenuBarWrapper>
);

export default MenuBar;