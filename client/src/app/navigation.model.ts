export class NavigationModel
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'title': 'Sistema',
                'type' : 'group',
                'children': [
                    {
                        'title': 'Sample',
                        'type' : 'item',
                        'icon' : 'email',
                        'url'  : '/sample',
                        'badge': {
                            'title': 25,
                            'bg'   : '#F44336',
                            'fg'   : '#FFFFFF'
                        }
                    },
                    {
                        'title': 'Usuarios',
                        'type' : 'item',
                        'icon' : 'person',
                        'url'  : '/users'
                    }
                ]
            }
        ];
    }
}
