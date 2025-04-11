pipeline {
  agent any


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
