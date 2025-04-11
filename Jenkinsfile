pipeline {
  agent any
  tools {
        nodejs 'NodeJS 20.15.1' 
    }

  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }

    stage('Docker Build & Push') {
      steps {
        sh 'docker build -t room-service .'
      }
    }
  }
}
