import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarCheck,
  faWheatAwn,
  faChartLine,
  faRupeeSign,
  faArrowUp,
  faArrowDown,
  faEquals,
  faCalendarAlt,
  faLeaf,
  faThermometerHalf,
  faDroplet,
  faCloudSun,
  faExclamationTriangle,
  faInfoCircle,
  faCheckCircle,
  faClock,
  faDownload,
  faRefresh,
  faHistory
} from '@fortawesome/free-solid-svg-icons';

const YieldPrediction = () => {
  const [selectedField, setSelectedField] = useState('north-field');
  const [predictionPeriod, setPredictionPeriod] = useState('current-season');

  const fields = [
    { id: 'north-field', name: 'North Field', crop: 'Wheat', area: 5.2, plantedDate: '2024-11-15' },
    { id: 'south-field', name: 'South Field', crop: 'Rice', area: 3.8, plantedDate: '2024-06-20' },
    { id: 'east-field', name: 'East Field', crop: 'Corn', area: 4.5, plantedDate: '2024-02-10' },
    { id: 'west-field', name: 'West Field', crop: 'Tomato', area: 2.1, plantedDate: '2024-10-05' }
  ];

  const predictionPeriods = [
    { id: 'current-season', name: 'Current Season (2024-25)' },
    { id: 'next-season', name: 'Next Season (2025-26)' },
    { id: 'annual', name: 'Annual Forecast' }
  ];

  const currentField = fields.find(f => f.id === selectedField);

  const yieldPrediction = {
    'north-field': {
      currentYield: 4.2,
      predictedYield: 4.8,
      minYield: 4.1,
      maxYield: 5.3,
      confidence: 89,
      harvestDate: '2025-04-15',
      daysToHarvest: 45,
      trend: 'up',
      factors: {
        weather: 85,
        soil: 92,
        irrigation: 88,
        cropHealth: 91,
        historicalPerformance: 87
      },
      risks: [
        { risk: 'Late season rainfall', impact: 'Medium', probability: 30 },
        { risk: 'Pest infestation', impact: 'High', probability: 15 },
        { risk: 'Market price volatility', impact: 'Medium', probability: 45 }
      ],
      recommendations: [
        'Monitor for rust diseases in the next 2 weeks',
        'Consider additional phosphorus application',
        'Plan harvest equipment booking early',
        'Monitor market prices for optimal selling timing'
      ]
    },
    'south-field': {
      currentYield: 6.1,
      predictedYield: 6.4,
      minYield: 5.8,
      maxYield: 7.0,
      confidence: 94,
      harvestDate: '2025-11-20',
      daysToHarvest: 280,
      trend: 'up',
      factors: {
        weather: 94,
        soil: 89,
        irrigation: 95,
        cropHealth: 93,
        historicalPerformance: 91
      },
      risks: [
        { risk: 'Monsoon delay', impact: 'High', probability: 25 },
        { risk: 'Brown plant hopper', impact: 'Medium', probability: 35 },
        { risk: 'Storage losses', impact: 'Low', probability: 20 }
      ],
      recommendations: [
        'Ensure adequate water storage for monsoon dependency',
        'Prepare pest management strategy',
        'Plan proper storage facilities',
        'Consider crop insurance for weather risks'
      ]
    },
    'east-field': {
      currentYield: 5.0,
      predictedYield: 5.5,
      minYield: 4.9,
      maxYield: 6.1,
      confidence: 87,
      harvestDate: '2025-07-10',
      daysToHarvest: 120,
      trend: 'up',
      factors: {
        weather: 88,
        soil: 85,
        irrigation: 90,
        cropHealth: 89,
        historicalPerformance: 84
      },
      risks: [
        { risk: 'Heat stress', impact: 'Medium', probability: 40 },
        { risk: 'Corn borer attack', impact: 'High', probability: 25 },
        { risk: 'Lodging due to wind', impact: 'Medium', probability: 20 }
      ],
      recommendations: [
        'Implement heat stress management practices',
        'Regular monitoring for pest symptoms',
        'Consider plant growth regulators to prevent lodging',
        'Plan irrigation schedule during hot periods'
      ]
    },
    'west-field': {
      currentYield: 28.5,
      predictedYield: 32.1,
      minYield: 27.8,
      maxYield: 35.6,
      confidence: 76,
      harvestDate: '2025-02-28',
      daysToHarvest: 25,
      trend: 'up',
      factors: {
        weather: 78,
        soil: 82,
        irrigation: 88,
        cropHealth: 75,
        historicalPerformance: 73
      },
      risks: [
        { risk: 'Fungal diseases', impact: 'High', probability: 55 },
        { risk: 'Market price crash', impact: 'Very High', probability: 35 },
        { risk: 'Transportation issues', impact: 'Medium', probability: 25 }
      ],
      recommendations: [
        'Immediate fungicide application needed',
        'Monitor market prices daily for best selling window',
        'Arrange harvest labor and transportation in advance',
        'Consider processing options to add value'
      ]
    }
  };

  const marketPrices = {
    'Wheat': { current: 2200, predicted: 2350, trend: 'up', change: 6.8 },
    'Rice': { current: 1950, predicted: 2100, trend: 'up', change: 7.7 },
    'Corn': { current: 1850, predicted: 1800, trend: 'down', change: -2.7 },
    'Tomato': { current: 18, predicted: 22, trend: 'up', change: 22.2 }
  };

  const prediction = yieldPrediction[selectedField];
  const marketData = marketPrices[currentField?.crop];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return faArrowUp;
      case 'down': return faArrowDown;
      default: return faEquals;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskColor = (impact) => {
    switch (impact) {
      case 'Very High': return 'text-red-700 bg-red-100';
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getFactorColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const calculateRevenue = (yieldAmount, price) => {
    return (yieldAmount * currentField?.area * price * 10).toLocaleString('en-IN'); // Convert to quintals and calculate
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Yield Prediction</h1>
            <p className="text-gray-600 mt-1">AI-powered harvest forecasting and market analysis</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {fields.map(field => (
                <option key={field.id} value={field.id}>{field.name} - {field.crop}</option>
              ))}
            </select>
            <select
              value={predictionPeriod}
              onChange={(e) => setPredictionPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {predictionPeriods.map(period => (
                <option key={period.id} value={period.id}>{period.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Field Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Field Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faLeaf} className="text-blue-600 mr-2" />
                <span className="font-medium text-gray-900">Field</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{currentField?.name}</p>
              <p className="text-sm text-gray-600">{currentField?.area} acres</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faWheatAwn} className="text-green-600 mr-2" />
                <span className="font-medium text-gray-900">Crop</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{currentField?.crop}</p>
              <p className="text-sm text-gray-600">Planted: {new Date(currentField?.plantedDate).toLocaleDateString()}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faCalendarCheck} className="text-purple-600 mr-2" />
                <span className="font-medium text-gray-900">Harvest Date</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{new Date(prediction?.harvestDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">{prediction?.daysToHarvest} days remaining</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faChartLine} className="text-orange-600 mr-2" />
                <span className="font-medium text-gray-900">Confidence</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{prediction?.confidence}%</p>
              <p className="text-sm text-gray-600">Prediction accuracy</p>
            </div>
          </div>
        </div>

        {/* Yield Prediction Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Yield Forecast */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Yield Forecast</h2>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Predicted Yield</span>
                <div className="flex items-center">
                  <FontAwesomeIcon 
                    icon={getTrendIcon(prediction?.trend)} 
                    className={`mr-2 ${getTrendColor(prediction?.trend)}`} 
                  />
                  <span className={`font-medium ${getTrendColor(prediction?.trend)}`}>
                    {prediction?.trend === 'up' ? '+' : prediction?.trend === 'down' ? '-' : ''}
                    {Math.abs(((prediction?.predictedYield - prediction?.currentYield) / prediction?.currentYield * 100) || 0).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {prediction?.predictedYield} tons/hectare
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                Range: {prediction?.minYield} - {prediction?.maxYield} tons/hectare
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${(prediction?.predictedYield / prediction?.maxYield) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Current Season Average</span>
                <span className="font-medium text-gray-900">{prediction?.currentYield} tons/hectare</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-gray-600">Expected Total Harvest</span>
                <span className="font-medium text-gray-900">
                  {(prediction?.predictedYield * currentField?.area * 2.47).toFixed(1)} tons
                </span>
              </div>
            </div>
          </div>

          {/* Market Analysis */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Market Analysis</h2>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Predicted Price at Harvest</span>
                <div className="flex items-center">
                  <FontAwesomeIcon 
                    icon={getTrendIcon(marketData?.trend)} 
                    className={`mr-2 ${getTrendColor(marketData?.trend)}`} 
                  />
                  <span className={`font-medium ${getTrendColor(marketData?.trend)}`}>
                    {marketData?.change > 0 ? '+' : ''}{marketData?.change}%
                  </span>
                </div>
              </div>
              
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ₹{marketData?.predicted}{currentField?.crop === 'Tomato' ? '/kg' : '/quintal'}
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                Current: ₹{marketData?.current}{currentField?.crop === 'Tomato' ? '/kg' : '/quintal'}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Expected Revenue</span>
                <span className="font-medium text-green-600">
                  ₹{calculateRevenue(prediction?.predictedYield, marketData?.predicted)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-gray-600">Potential Profit Increase</span>
                <span className="font-medium text-green-700">
                  ₹{(calculateRevenue(prediction?.predictedYield, marketData?.predicted) - 
                      calculateRevenue(prediction?.currentYield, marketData?.current)).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Factors Affecting Yield */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Factors Affecting Yield</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.entries(prediction?.factors || {}).map(([factor, score]) => (
              <div key={factor} className="text-center">
                <div className="mb-2">
                  <div className="text-sm font-medium text-gray-900 capitalize mb-2">
                    {factor.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{score}%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getFactorColor(score)}`} 
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h2>
          <div className="space-y-3">
            {prediction?.risks.map((risk, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{risk.risk}</div>
                    <div className="text-sm text-gray-600">Probability: {risk.probability}%</div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(risk.impact)}`}>
                  {risk.impact} Impact
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h2>
          <div className="space-y-3">
            {prediction?.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 mt-1 mr-3" />
                <div className="text-blue-800">{recommendation}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Historical Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Historical Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <FontAwesomeIcon icon={faHistory} className="text-gray-500 text-2xl mb-2" />
              <div className="text-xl font-bold text-gray-900">3.8 tons/ha</div>
              <div className="text-sm text-gray-600">Last Season (2023-24)</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <FontAwesomeIcon icon={faChartLine} className="text-blue-500 text-2xl mb-2" />
              <div className="text-xl font-bold text-gray-900">4.1 tons/ha</div>
              <div className="text-sm text-gray-600">3-Year Average</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <FontAwesomeIcon icon={faArrowUp} className="text-green-500 text-2xl mb-2" />
              <div className="text-xl font-bold text-green-600">+17%</div>
              <div className="text-sm text-gray-600">Expected Improvement</div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <FontAwesomeIcon icon={faInfoCircle} className="text-yellow-600 mt-1 mr-3" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Prediction Disclaimer</h3>
              <p className="text-yellow-800 text-sm">
                These predictions are based on AI analysis of historical data, current conditions, and statistical models. 
                Actual yields may vary due to unforeseen weather events, pest outbreaks, market conditions, and other factors. 
                Use these predictions as guidance alongside your farming experience and local knowledge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;