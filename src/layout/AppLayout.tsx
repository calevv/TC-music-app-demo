import { Suspense } from 'react';
import { Outlet } from 'react-router';
import * as S from './AppLayout.styled';
import NavBox from './components/NavBox';
import { Library } from './components/Library';
import LibraryHead from './components/LibraryHead';

function AppLayout() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <S.Layout>
                <S.Sidebar>
                    <S.ContentBox>
                        <NavBox />
                    </S.ContentBox>
                    <S.ContentBox sx={{ height: '100%' }}>
                        <LibraryHead />
                        <Library />
                    </S.ContentBox>
                </S.Sidebar>
                <Outlet />
            </S.Layout>
        </Suspense>
    );
}

export default AppLayout;
