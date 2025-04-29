const SearchTab = ({ providers, onProviderChange, selectedProvider }) => (
    <div className="tab search-tab ng-star-inserted">
      <ul className="item-ani">
        <li className="condition-groups ng-star-inserted">
          <div 
            className="icon-all" 
            style={{ backgroundImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-filter-all.svg?v=1745315543147")' }} 
          />
          <li>ALL</li>
        </li>
        {providers.map(provider => (
          <li 
            key={provider.id} 
            className={`condition-groups ${selectedProvider === provider.id ? 'active' : ''} ng-star-inserted`}
          >
            <input 
              style={{ display: 'none' }} 
              className="ng-star-inserted" 
              id={provider.id} 
              type="checkbox"
              checked={selectedProvider === provider.id}
              onChange={() => onProviderChange(provider.id)}
            />
            <label className="ng-star-inserted" htmlFor={provider.id}>
              {provider.code}
            </label>
          </li>
        ))}
      </ul>
      <div className="btn search-btn ng-star-inserted">
        <span 
          className="item-icon ng-star-inserted" 
          style={{ maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-search-type02.svg?v=1745315543147")' }} 
        />
      </div>
    </div>
  );

  export default SearchTab