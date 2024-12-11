import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config';
import { fromPairs } from 'lodash-es';
import { map, Observable, ReplaySubject, switchMap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FuseMediaWatcherService implements OnInit
{
    private _onMediaChange: ReplaySubject<{ matchingAliases: string[]; matchingQueries: any }> = new ReplaySubject<{ matchingAliases: string[]; matchingQueries: any }>(1);

    constructor(
        private _breakpointObserver: BreakpointObserver,
        private _fuseConfigService: FuseConfigService
    ) {}

    ngOnInit(): void {
        this._fuseConfigService.config$.pipe(
            map(config => 
                fromPairs(Object.entries(config.screens).map(([alias, screen]) => ([alias, `(min-width: ${screen})`])))
            ),
            switchMap(screens =>
                this._breakpointObserver.observe(Object.values(screens)).pipe(
                    map((state) => {
                        // Prepare the observable values and set their defaults
                        const matchingAliases: string[] = [];
                        const matchingQueries: any = {};

                        // Get the matching breakpoints and use them to fill the subject
                        const matchingBreakpoints = Object.entries(state.breakpoints).filter(([query, matches]) => matches) ?? [];
                        for (const [query] of matchingBreakpoints) {
                            const matchingAliasEntry = Object.entries(screens).find(([alias, q]) => q === query);
                            if (matchingAliasEntry) {
                                const matchingAlias = matchingAliasEntry[0];  // If found, get the alias

                                // Add the matching query to the observable values
                                matchingAliases.push(matchingAlias);
                                matchingQueries[matchingAlias] = query;
                            }
                        }

                        // Execute the observable
                        this._onMediaChange.next({
                            matchingAliases,
                            matchingQueries,
                        });
                    })
                )
            )
        ).subscribe();
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for _onMediaChange
     */
    get onMediaChange$(): Observable<{ matchingAliases: string[]; matchingQueries: any }>
    {
        return this._onMediaChange.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On media query change
     *
     * @param query
     */
    onMediaQueryChange$(query: string | string[]): Observable<BreakpointState>
    {
        return this._breakpointObserver.observe(query);
    }
}
