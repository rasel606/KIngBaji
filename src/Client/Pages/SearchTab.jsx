const SearchTab = ({ providers, onProviderChange, selectedProvider }) => (
    <div className="tab search-tab ng-star-inserted">
    <ul className="item-ani">
      <li 
        className={`condition-groups ng-star-inserted ${!selectedProvider ? 'active' : ''}`}
        onClick={() => onProviderChange(null)}
      >
        <div 
          className="icon-all" 
          style={{ backgroundImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-filter-all.svg?v=1745315543147")' }} 
        />
        <p>ALL</p>
      </li>
      {providers.map(provider => (
        <li 
          key={provider._id} 
          className={`condition-groups ${selectedProvider === provider.providercode ? 'active' : ''} ng-star-inserted`}
          onClick={() => onProviderChange(provider.providercode)}
        >
          <div className="provider-label">
            {provider.providercode}
          </div>
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